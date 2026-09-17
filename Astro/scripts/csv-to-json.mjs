#!/usr/bin/env node
/**
 * Converts the Webflow CMS exports (CSV) into the JSON content files used by the
 * theme (src/data/*.json) and by the Strapi seed script.
 *
 *   node scripts/csv-to-json.mjs [path/to/cms-folder]
 *
 * Expects "Service CMS.csv", "Project CMS.csv" and "Blog CMS.csv" in the folder
 * (defaults to ../CMS). Image URLs pointing at the Webflow CDN are rewritten to
 * /images/cms/<file> – download them into public/images/cms/ first.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cmsDir = resolve(process.argv[2] ?? resolve(here, '../../CMS'));
const outDir = resolve(here, '../src/data');

/** Tiny RFC 4180 CSV parser (handles quoted fields with commas/newlines). */
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const [header, ...body] = rows.filter((r) => r.length > 1);
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

const read = (name) => parseCsv(readFileSync(resolve(cmsDir, name), 'utf8').replace(/^﻿/, ''));

/** Webflow CDN asset URL → local /images/cms/<clean-name>. */
function localImage(url) {
  url = url.trim();
  if (!url.startsWith('https://cdn.prod.website-files.com/')) return url;
  let name = decodeURIComponent(url.slice(url.lastIndexOf('/') + 1));
  name = name.replace(/^[0-9a-f]{24}_/, '').replace(/\s*\((\d+)\)/g, '-$1').replace(/\s/g, '-').toLowerCase();
  if (name === '_.png') name = 'quote-logo.png';
  return `/images/cms/${name}`;
}

/** Normalise Webflow rich text HTML. */
function rich(htmlText) {
  return htmlText
    .trim()
    .replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"'\s<>]+/g, (m) => localImage(m))
    .replace(/ alt="__wf_reserved_inherit"/g, ' alt=""')
    .replace(/<ul>/g, '<ul role="list">')
    .replace(/ width="auto" height="auto"/g, '')
    .replace(/ data-rt-[a-z-]+="[^"]*"/g, '');
}

function isoDate(s) {
  const m = /^\w{3} (\w{3}) (\d{2}) (\d{4})/.exec(s.trim());
  if (!m) return '';
  const d = new Date(`${m[1]} ${m[2]} ${m[3]} UTC`);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

const services = read('Service CMS.csv')
  .map((r) => ({
    slug: r['Slug'],
    title: r['Service Title'].trim(),
    number: r['Number'].trim(),
    order: Number(r['Number']),
    image: localImage(r['Service Main Image']),
    shortSummary: r['Short Summary'].trim(),
    cardDetails: rich(r['Service Card Details']),
    items: [1, 2, 3, 4].map((i) => r[`Service Item ${i}`].trim()),
    benefits: [1, 2, 3, 4].map((i) => rich(r[`Benefit 0${i}`])),
    details01: rich(r['Service Details 01']),
    details02: rich(r['Service Details 02']),
    industries: [1, 2, 3].map((i) => rich(r[`Industries 0${i}`])),
    detailsHeading: r['Service Details Heading'].trim(),
  }))
  .sort((a, b) => a.order - b.order);

const projects = read('Project CMS.csv')
  .map((r) => ({
    slug: r['Slug'],
    title: r['Project Title'].trim(),
    serial: r['Serial Number'].trim(),
    order: Number(r['Serial Number'].replace(/\//g, '')),
    shortSummary: r['Short Summary'].trim(),
    image: localImage(r['Main Project Image']),
    client: r['Client'].trim(),
    industry: r['Industry'].trim(),
    timeline: r['Timeline'].trim(),
    location: r['Location'].trim(),
    longSummary: r['Long Summary'].trim(),
    mainHeading: r['Main Heading'].trim(),
    year: r['Year'].trim(),
    services: [1, 2, 3].map((i) => r[`Service 0${i}`].trim()),
    providedServices: r['Provided Services'].trim(),
    details01: rich(r['Work Details 01']),
    details02: rich(r['Work Details 02']),
    engagement: r['Engagement'].trim(),
    conversionRate: r['Conversion Rate'].trim(),
    userOnboarding: r['User Onboarding'].trim(),
    images: [localImage(r['Multi Img 01']), localImage(r['Multi Img 02'])],
  }))
  .sort((a, b) => a.order - b.order);

// Webflow lists posts newest-created first; the CSV is oldest-first.
const blog = read('Blog CMS.csv')
  .reverse()
  .map((r, i) => ({
    slug: r['Slug'],
    title: r['Name'].trim(),
    order: i + 1,
    summary: r['Post Summary'].trim(),
    image: localImage(r['Main Image']),
    featured: r['Featured?'].trim() === 'true',
    category: r['Category'].trim(),
    date: isoDate(r['Date']),
    readTime: r['Read Time'].trim(),
    detailsSummary: r['Post Details Summary'].trim(),
    details01: rich(r['Post Details 01']),
    details02: rich(r['Post Details 02']),
    quoteLogo: localImage(r['Quote Logo']),
    quoteText: r['Quote Text'].trim(),
    altText: r['Alt Text'].trim(),
  }));

mkdirSync(outDir, { recursive: true });
for (const [name, data] of Object.entries({ services, projects, blog })) {
  writeFileSync(resolve(outDir, `${name}.json`), JSON.stringify(data, null, 2) + '\n');
  console.log(`${name}: ${data.length} entries → src/data/${name}.json`);
}
