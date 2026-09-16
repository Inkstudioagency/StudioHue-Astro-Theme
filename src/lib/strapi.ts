/**
 * Minimal Strapi v5 REST client used at build time.
 *
 * Configure with the STRAPI_URL (and optionally STRAPI_TOKEN) environment
 * variables – see .env.example. When Strapi is not configured or cannot be
 * reached, `fetchCollection` returns `null` and the content loaders fall back
 * to the bundled JSON in src/data/.
 */

import { marked } from 'marked';

export const STRAPI_URL = String(import.meta.env.STRAPI_URL ?? '').replace(/\/$/, '');
const STRAPI_TOKEN = String(import.meta.env.STRAPI_TOKEN ?? '');

export const isStrapiConfigured = () => STRAPI_URL.length > 0;

export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

/** Turn a Strapi media object (or a plain string) into an absolute URL. */
export function mediaUrl(media: StrapiMedia | string | null | undefined): string {
  if (!media) return '';
  const url = typeof media === 'string' ? media : media.url;
  if (!url) return '';
  return url.startsWith('/') ? `${STRAPI_URL}${url}` : url;
}

/**
 * Rich text coming from Strapi: HTML (as imported from the Webflow export) is
 * passed through with /uploads/ paths made absolute; Markdown written in the
 * Strapi editor is converted to HTML.
 */
export function richText(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return '';
  const html = /^\s*</.test(value) ? value : (marked.parse(value, { async: false }) as string);
  return STRAPI_URL ? html.replace(/(src|href)="\/uploads\//g, `$1="${STRAPI_URL}/uploads/`) : html;
}

export async function fetchCollection<T = Record<string, unknown>>(
  collection: string,
  query = 'populate=*&pagination[pageSize]=100&sort=order:asc',
): Promise<T[] | null> {
  if (!isStrapiConfigured()) return null;

  const url = `${STRAPI_URL}/api/${collection}?${query}`;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) {
      console.warn(`[strapi] ${collection}: HTTP ${res.status} – using local JSON fallback`);
      return null;
    }
    const json = (await res.json()) as { data?: T[] };
    return Array.isArray(json.data) ? json.data : null;
  } catch (err) {
    console.warn(`[strapi] ${collection}: ${(err as Error).message} – using local JSON fallback`);
    return null;
  }
}
