import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { strapiLoader } from './loaders/strapi';
import { mediaUrl, richText } from './lib/strapi';
import config from './config/config.json';
import servicesData from './data/services.json';
import projectsData from './data/projects.json';
import blogData from './data/blog.json';

const str = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v));

/* ---------------------------------------------------------------------------
 * Services
 * ------------------------------------------------------------------------- */
const serviceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  number: z.string(),
  order: z.number(),
  image: z.string(),
  shortSummary: z.string(),
  cardDetails: z.string(),
  items: z.array(z.string()),
  benefits: z.array(z.string()),
  details01: z.string(),
  details02: z.string(),
  industries: z.array(z.string()),
  detailsHeading: z.string(),
});
type Service = z.infer<typeof serviceSchema>;

const normalizeService = (r: Record<string, any>): Service => ({
  slug: str(r.slug),
  title: str(r.title),
  number: str(r.number ?? String(r.order ?? '').padStart(2, '0')),
  order: Number(r.order ?? 0),
  image: mediaUrl(r.image),
  shortSummary: str(r.shortSummary),
  cardDetails: richText(r.cardDetails),
  items: [r.serviceItem1, r.serviceItem2, r.serviceItem3, r.serviceItem4].map(str),
  benefits: [r.benefit1, r.benefit2, r.benefit3, r.benefit4].map(richText),
  details01: richText(r.details01),
  details02: richText(r.details02),
  industries: [r.industries1, r.industries2, r.industries3].map(richText),
  detailsHeading: str(r.detailsHeading),
});

/* ---------------------------------------------------------------------------
 * Projects
 * ------------------------------------------------------------------------- */
const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  serial: z.string(),
  order: z.number(),
  shortSummary: z.string(),
  image: z.string(),
  client: z.string(),
  industry: z.string(),
  timeline: z.string(),
  location: z.string(),
  longSummary: z.string(),
  mainHeading: z.string(),
  year: z.string(),
  services: z.array(z.string()),
  providedServices: z.string(),
  details01: z.string(),
  details02: z.string(),
  engagement: z.string(),
  conversionRate: z.string(),
  userOnboarding: z.string(),
  images: z.array(z.string()),
});
type Project = z.infer<typeof projectSchema>;

const normalizeProject = (r: Record<string, any>): Project => ({
  slug: str(r.slug),
  title: str(r.title),
  serial: str(r.serial ?? `//${String(r.order ?? '').padStart(2, '0')}`),
  order: Number(r.order ?? 0),
  shortSummary: str(r.shortSummary),
  image: mediaUrl(r.image),
  client: str(r.client),
  industry: str(r.industry),
  timeline: str(r.timeline),
  location: str(r.location),
  longSummary: str(r.longSummary),
  mainHeading: str(r.mainHeading),
  year: str(r.year),
  services: [r.service1, r.service2, r.service3].map(str),
  providedServices: str(r.providedServices),
  details01: richText(r.details01),
  details02: richText(r.details02),
  engagement: str(r.engagement),
  conversionRate: str(r.conversionRate),
  userOnboarding: str(r.userOnboarding),
  images: [r.image1, r.image2].map(mediaUrl),
});

/* ---------------------------------------------------------------------------
 * Blog
 * ------------------------------------------------------------------------- */
const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  order: z.number(),
  summary: z.string(),
  image: z.string(),
  featured: z.boolean(),
  category: z.string(),
  date: z.string(),
  readTime: z.string(),
  detailsSummary: z.string(),
  details01: z.string(),
  details02: z.string(),
  quoteLogo: z.string(),
  quoteText: z.string(),
  altText: z.string(),
});
type Post = z.infer<typeof postSchema>;

const normalizePost = (r: Record<string, any>): Post => ({
  slug: str(r.slug),
  title: str(r.title),
  order: Number(r.order ?? 0),
  summary: str(r.summary),
  image: mediaUrl(r.image),
  featured: Boolean(r.featured),
  category: str(r.category),
  date: str(r.date),
  readTime: str(r.readTime),
  detailsSummary: str(r.detailsSummary),
  details01: richText(r.details01),
  details02: richText(r.details02),
  quoteLogo: mediaUrl(r.quoteLogo),
  quoteText: str(r.quoteText),
  altText: str(r.altText),
});

const { collections: ids } = config.strapi;

export const collections = {
  services: defineCollection({
    loader: strapiLoader<Service>({ collection: ids.services, fallback: servicesData, normalize: normalizeService }),
    schema: serviceSchema,
  }),
  projects: defineCollection({
    loader: strapiLoader<Project>({ collection: ids.projects, fallback: projectsData, normalize: normalizeProject }),
    schema: projectSchema,
  }),
  blog: defineCollection({
    loader: strapiLoader<Post>({ collection: ids.blog, fallback: blogData, normalize: normalizePost }),
    schema: postSchema,
  }),
};
