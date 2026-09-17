/**
 * Seeds the Services / Projects / Posts collections from data/*.json (the
 * StudioHue Webflow CMS export converted by Astro/scripts/csv-to-json.mjs) and
 * uploads the referenced images from data/images/.
 *
 * Runs automatically on bootstrap when all three collections are empty, or on
 * demand with `SEED_DATA=true npm run develop`. It also grants the Public role
 * read access (find / findOne) to the three collections so the Astro site can
 * fetch content without a token.
 */
import type { Core } from '@strapi/strapi';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { resolve, basename, extname } from 'node:path';

const DATA_DIR = resolve(process.cwd(), 'data');
const IMAGE_DIR = resolve(DATA_DIR, 'images');

const MIME: Record<string, string> = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.avif': 'image/avif', '.svg': 'image/svg+xml' };

type Json = Record<string, any>;

export async function seedIfEmpty(strapi: Core.Strapi) {
  const force = process.env.SEED_DATA === 'true';
  const counts = await Promise.all(
    ['api::service.service', 'api::project.project', 'api::post.post'].map((uid) => strapi.documents(uid as any).count({})),
  );
  const empty = counts.every((c) => c === 0);
  if (!force && !empty) return;

  strapi.log.info('[seed] importing StudioHue content from data/*.json …');
  await grantPublicRead(strapi);
  const upload = createUploader(strapi);

  const services = read('services.json');
  const projects = read('projects.json');
  const posts = read('blog.json');

  for (const s of services) {
    await createIfMissing(strapi, 'api::service.service', s.slug, {
      title: s.title, slug: s.slug, number: s.number, order: s.order,
      image: await upload(s.image), shortSummary: s.shortSummary,
      cardDetails: await upload.html(s.cardDetails),
      serviceItem1: s.items[0], serviceItem2: s.items[1], serviceItem3: s.items[2], serviceItem4: s.items[3],
      benefit1: await upload.html(s.benefits[0]), benefit2: await upload.html(s.benefits[1]),
      benefit3: await upload.html(s.benefits[2]), benefit4: await upload.html(s.benefits[3]),
      details01: await upload.html(s.details01), details02: await upload.html(s.details02),
      industries1: await upload.html(s.industries[0]), industries2: await upload.html(s.industries[1]), industries3: await upload.html(s.industries[2]),
      detailsHeading: s.detailsHeading,
    });
  }
  for (const p of projects) {
    await createIfMissing(strapi, 'api::project.project', p.slug, {
      title: p.title, slug: p.slug, serial: p.serial, order: p.order,
      shortSummary: p.shortSummary, image: await upload(p.image),
      client: p.client, industry: p.industry, timeline: p.timeline, location: p.location,
      longSummary: p.longSummary, mainHeading: p.mainHeading, year: p.year,
      service1: p.services[0], service2: p.services[1], service3: p.services[2], providedServices: p.providedServices,
      details01: await upload.html(p.details01), details02: await upload.html(p.details02),
      engagement: p.engagement, conversionRate: p.conversionRate, userOnboarding: p.userOnboarding,
      image1: await upload(p.images[0]), image2: await upload(p.images[1]),
    });
  }
  for (const b of posts) {
    await createIfMissing(strapi, 'api::post.post', b.slug, {
      title: b.title, slug: b.slug, order: b.order, summary: b.summary,
      image: await upload(b.image), featured: b.featured, category: b.category,
      date: b.date || null, readTime: b.readTime, detailsSummary: b.detailsSummary,
      details01: await upload.html(b.details01), details02: await upload.html(b.details02),
      quoteLogo: await upload(b.quoteLogo), quoteText: b.quoteText, altText: b.altText,
    });
  }
  strapi.log.info(`[seed] done – ${services.length} services, ${projects.length} projects, ${posts.length} posts`);
}

function read(file: string): Json[] {
  return JSON.parse(readFileSync(resolve(DATA_DIR, file), 'utf8'));
}

async function createIfMissing(strapi: Core.Strapi, uid: string, slug: string, data: Json) {
  const existing = await strapi.documents(uid as any).findFirst({ filters: { slug } });
  if (existing) {
    strapi.log.info(`[seed] ${uid} "${slug}" already exists – skipped`);
    return;
  }
  await strapi.documents(uid as any).create({ data, status: 'published' });
  strapi.log.info(`[seed] created ${uid} "${slug}"`);
}

/** Uploads local images (deduplicated by file name) and returns the media id / url. */
function createUploader(strapi: Core.Strapi) {
  const cache = new Map<string, { id: number; url: string }>();

  async function uploadOne(src: string | undefined): Promise<{ id: number; url: string } | null> {
    if (!src) return null;
    const name = basename(src);
    if (cache.has(name)) return cache.get(name)!;

    const filepath = resolve(IMAGE_DIR, name);
    if (!existsSync(filepath)) {
      strapi.log.warn(`[seed] image not found, skipped: ${filepath}`);
      return null;
    }
    // Re-use a previously uploaded file with the same name (e.g. after a re-seed).
    const found = await strapi.db.query('plugin::upload.file').findOne({ where: { name } });
    if (found) {
      cache.set(name, { id: found.id, url: found.url });
      return cache.get(name)!;
    }
    const [file] = await strapi.plugin('upload').service('upload').upload({
      data: { fileInfo: { name, alternativeText: '' } },
      files: { filepath, originalFileName: name, size: statSync(filepath).size, mimetype: MIME[extname(name).toLowerCase()] ?? 'application/octet-stream' },
    });
    cache.set(name, { id: file.id, url: file.url });
    return cache.get(name)!;
  }

  /** Media field value (id) for a local image path. */
  const upload = async (src: string | undefined) => (await uploadOne(src))?.id ?? null;

  /** Rewrites <img src="/images/cms/…"> inside rich text to the uploaded file URL. */
  upload.html = async (html: string | undefined) => {
    if (!html) return '';
    const srcs = [...html.matchAll(/src="(\/images\/cms\/[^"]+)"/g)].map((m) => m[1]);
    let out = html;
    for (const src of new Set(srcs)) {
      const file = await uploadOne(src);
      if (file) out = out.split(`src="${src}"`).join(`src="${file.url}"`);
    }
    return out;
  };

  return upload;
}

/** Give the Public role find/findOne on the three collections. */
async function grantPublicRead(strapi: Core.Strapi) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  if (!role) return;
  const actions = ['service', 'project', 'post'].flatMap((n) => [`api::${n}.${n}.find`, `api::${n}.${n}.findOne`]);
  for (const action of actions) {
    const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: role.id } });
    if (!exists) await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: role.id } });
  }
}
