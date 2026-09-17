/**
 * Astro content-layer loader: Strapi first, bundled JSON as fallback.
 *
 * Usage (src/content.config.ts):
 *   loader: strapiLoader({ collection: 'services', fallback: services, normalize: normalizeService })
 */
import type { Loader } from 'astro/loaders';
import { fetchCollection } from '../lib/strapi';

interface StrapiLoaderOptions<T extends { slug: string }> {
  /** Strapi API id (plural), e.g. "services" → /api/services */
  collection: string;
  /** Entries used when Strapi is not configured/reachable. */
  fallback: T[];
  /** Maps a raw Strapi entry to the same shape as the fallback entries. */
  normalize: (raw: Record<string, any>) => T;
}

export function strapiLoader<T extends { slug: string }>({ collection, fallback, normalize }: StrapiLoaderOptions<T>): Loader {
  return {
    name: `strapi-${collection}`,
    load: async ({ store, logger, parseData, generateDigest }) => {
      const remote = await fetchCollection(collection);
      const entries: T[] = remote ? remote.map(normalize) : fallback;
      logger.info(`${collection}: ${entries.length} entries from ${remote ? 'Strapi' : 'src/data (fallback)'}`);

      store.clear();
      for (const entry of entries) {
        const data = await parseData({ id: entry.slug, data: entry as Record<string, unknown> });
        store.set({ id: entry.slug, data, digest: generateDigest(data) });
      }
    },
  };
}
