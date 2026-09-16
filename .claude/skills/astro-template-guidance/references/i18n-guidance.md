# Multi-language (i18n)

The theme ships single-language (English) with no localized routing. To add languages:

1. Enable Astro i18n routing in `astro.config.mjs`:
   ```js
   i18n: { defaultLocale: 'en', locales: ['en', 'de'], routing: { prefixDefaultLocale: false } }
   ```
2. Move pages into `src/pages/[lang]/` (or duplicate per locale) and read `Astro.currentLocale`.
3. Localize UI strings by adding per-locale objects to `src/config/config.json` / `menu.json`
   (e.g. `menu.de.main`) and selecting them in `Header`, `Footer`, `Cta`.
4. Content: with Strapi enable the Internationalization plugin and query `?locale=<code>`
   (`fetchCollection(collection, 'populate=*&locale=de')`); with JSON keep one file per locale
   (`src/data/de/blog.json`) and pick it in `src/content.config.ts`.
5. Add `hreflang` links in `SeoMeta` and a language switcher in `Header`.

Docs: https://docs.astro.build/en/guides/internationalization/
