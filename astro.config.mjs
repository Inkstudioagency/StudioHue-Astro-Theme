// @ts-check
import { defineConfig } from 'astro/config';
import config from './src/config/config.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  // Used for canonical/Open Graph URLs – change it in src/config/config.json
  site: config.site.base_url,
});
