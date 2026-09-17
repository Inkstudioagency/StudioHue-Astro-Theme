# StudioHue CMS (Strapi 5)

Headless CMS for the StudioHue Astro theme (`../Astro`). It provides three collection types –
**Service**, **Project**, **Post** – pre-filled with the demo content from the Webflow CMS export,
and exposes the [Strapi MCP server](https://docs.strapi.io/cms/features/strapi-mcp-server) so AI
agents (Claude Code, Cursor, …) can manage entries.

## Run

```sh
npm install
npm run develop          # http://localhost:1337/admin
```

- First start: the bootstrap hook (`src/index.ts` → `src/seed/index.ts`) imports `data/*.json`,
  uploads the images from `data/images/`, publishes every entry and gives the **Public** role
  `find` / `findOne` on the three collections.
- Create the first admin user in the admin panel.
- Re-run the import later with `SEED_DATA=true npm run develop` (existing slugs are skipped).

The database is SQLite (`.tmp/data.db`) – switch to Postgres/MySQL in `config/database.ts` for
production.

## Content types

| API id (`/api/…`) | Fields |
| --- | --- |
| `services` | title, slug, number, order, image, shortSummary, cardDetails, serviceItem1‑4, benefit1‑4, details01/02, industries1‑3, detailsHeading |
| `projects` | title, slug, serial, order, shortSummary, image, client, industry, timeline, location, longSummary, mainHeading, year, service1‑3, providedServices, details01/02, engagement, conversionRate, userOnboarding, image1, image2 |
| `posts` | title, slug, order, summary, image, featured, category, date, readTime, detailsSummary, details01/02, quoteLogo, quoteText, altText |

`details*`, `benefit*`, `industries*`, `cardDetails` are Rich text (Markdown) fields. They contain
the HTML imported from Webflow; Markdown typed in the editor also works – the Astro site converts it.

Draft & Publish is enabled – only **published** entries are visible to the site.

## Connect the Astro site

```sh
cd ../Astro && cp .env.example .env     # STRAPI_URL=http://localhost:1337
npm run build                           # → "services: 6 entries from Strapi"
```

Optional: instead of public permissions create an API token (Settings → API Tokens, type
*Read-only*) and set `STRAPI_TOKEN` in `../Astro/.env`.

## MCP server (AI agents)

Enabled in `config/server.ts` (`mcp.enabled`, toggle with `MCP_ENABLED` in `.env`). Endpoint:
`http://localhost:1337/mcp` (Streamable HTTP). It exposes `list_<type>`, `get_<type>`, `create_<type>`, `update_<type>`, `delete_<type>`,
`publish_<type>`, `unpublish_<type>` and `discard_<type>_draft` tools for `service`, `project` and `post` (25 tools in total), limited by the token's permissions.

1. Admin panel → **Settings → Administration Panel → Admin Tokens** → create a token (plaintext is shown once) and copy it.
2. Claude Code:
   ```sh
   claude mcp add strapi-mcp --transport http http://localhost:1337/mcp \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```
   or use the project file `../.mcp.json` with `STRAPI_MCP_TOKEN` exported in your shell.
3. Restart the client and run `/mcp` to confirm. Example prompts: "list the published posts",
   "create a service called Motion Design with number 07", "unpublish the project pulsecare".

Other clients (Cursor `.cursor/mcp.json`, Windsurf): transport `streamable-http`, URL
`http://localhost:1337/mcp`, header `Authorization: Bearer <token>`.

Docs: https://docs.strapi.io/cms/features/strapi-mcp-server ·
https://strapi.io/blog/the-strapi-mcp-server-is-now-ga
