/** Typed helpers around the three content collections. */
import { getCollection, type CollectionEntry } from 'astro:content';

export type ServiceEntry = CollectionEntry<'services'>;
export type ProjectEntry = CollectionEntry<'projects'>;
export type PostEntry = CollectionEntry<'blog'>;

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

/** Services sorted by their number (01, 02, …). */
export async function getServices(): Promise<ServiceEntry[]> {
  return (await getCollection('services')).sort(byOrder);
}

/** Projects sorted by serial number (//01, //02, …). */
export async function getProjects(): Promise<ProjectEntry[]> {
  return (await getCollection('projects')).sort(byOrder);
}

/** All posts, newest first (Webflow "created on" order). */
export async function getPosts(): Promise<PostEntry[]> {
  return (await getCollection('blog')).sort(byOrder);
}

/** The featured post shown at the top of /blog (first one flagged as featured). */
export async function getFeaturedPost(): Promise<PostEntry | undefined> {
  return (await getPosts()).find((p) => p.data.featured);
}

/** Posts for listings – everything except the featured one. */
export async function getRegularPosts(): Promise<PostEntry[]> {
  return (await getPosts()).filter((p) => !p.data.featured);
}

export const serviceUrl = (slug: string) => `/services/${slug}`;
export const projectUrl = (slug: string) => `/project/${slug}`;
export const postUrl = (slug: string) => `/post/${slug}`;

/** "2026-06-24" → "June 24, 2026" (Webflow's default date format). */
export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
