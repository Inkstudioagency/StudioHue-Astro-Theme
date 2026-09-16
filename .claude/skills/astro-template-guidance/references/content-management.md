# Content management

The theme has three collections – **services**, **projects**, **blog** – defined in
`src/content.config.ts`. Each is loaded by `strapiLoader()` (`src/loaders/strapi.ts`):

1. If `STRAPI_URL` is set and the API answers, entries come from Strapi (`/api/<collection>?populate=*`).
2. Otherwise the bundled JSON in `src/data/` is used.

Both sources produce the same shape, so pages never care where content came from.

## Editing the JSON (no CMS)

`src/data/services.json`, `projects.json`, `blog.json`. Fields:

**services** – `slug`, `title`, `number` ("01"), `order`, `image`, `shortSummary`, `cardDetails` (HTML `<ul>`),
`items[4]`, `benefits[4]` (HTML), `details01`, `details02` (HTML), `industries[3]` (HTML `<ul>`), `detailsHeading`.

**projects** – `slug`, `title`, `serial` ("//01"), `order`, `shortSummary`, `image`, `client`, `industry`,
`timeline`, `location`, `longSummary`, `mainHeading`, `year`, `services[3]`, `providedServices`,
`details01`, `details02` (HTML), `engagement`, `conversionRate`, `userOnboarding`, `images[2]`.

**blog** – `slug`, `title`, `order` (1 = newest), `summary`, `image`, `featured`, `category`,
`date` (YYYY-MM-DD), `readTime`, `detailsSummary`, `details01`, `details02` (HTML), `quoteLogo`,
`quoteText`, `altText`.

Images: put files in `public/images/cms/` and reference `/images/cms/<file>`.

Rich-text HTML uses the design's typography: `<h4>` section titles, `<h6>` sub-labels, `<p>`,
`<ul role="list">`, and full-width figures:

```html
<figure class="w-richtext-figure-type-image w-richtext-align-fullwidth"><div><img src="/images/cms/x.webp" alt="" loading="lazy"></div></figure>
```

## Editing in Strapi

Content types mirror the JSON (camelCase field names, arrays split into numbered fields:
`serviceItem1..4`, `benefit1..4`, `industries1..3`, `service1..3`, `image1`, `image2`).
Rich-text fields are Strapi "Rich text (Markdown)" fields: the imported HTML is kept verbatim and
Markdown typed in the editor is converted to HTML at build time (`richText()` in `src/lib/strapi.ts`).

Workflow:

```sh
cd ../Strapi && npm run develop      # http://localhost:1337/admin – create the first admin user
cd ../Astro && cp .env.example .env  # STRAPI_URL=http://localhost:1337
npm run build                        # "services: 6 entries from Strapi"
```

Publish entries in Strapi (Draft & Publish is on) – unpublished entries are not returned by the API.

## Re-importing from a Webflow CSV export

Put `Service CMS.csv`, `Project CMS.csv`, `Blog CMS.csv` in `../CMS`, download any new images into
`public/images/cms/`, then `npm run data:csv`. Copy the JSON to `../Strapi/data/` and start Strapi with
`SEED_DATA=true` to import new entries (existing slugs are skipped).
