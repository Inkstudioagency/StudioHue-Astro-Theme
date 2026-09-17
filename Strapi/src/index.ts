import type { Core } from '@strapi/strapi';
import { seedIfEmpty } from './seed';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * Runs before the application starts: imports the StudioHue demo content
   * (data/*.json) when the collections are empty. See src/seed/index.ts.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await seedIfEmpty(strapi);
    } catch (err) {
      strapi.log.error(`[seed] failed: ${(err as Error).message}`);
    }
  },
};
