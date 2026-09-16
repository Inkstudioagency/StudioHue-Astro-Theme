# Scripts

Package manager: npm (a `pnpm`/`yarn` lockfile is not included; any of them works).

| Script | What it does |
| --- | --- |
| `npm run dev` | Astro dev server on http://localhost:4321 (add `--background` to detach; `astro dev stop/status/logs` manage it) |
| `npm run build` | Static build to `dist/`. Logs where each collection came from (Strapi or JSON). |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | `astro check` – type-checks `.astro`/`.ts` files (`public/` is excluded) |
| `npm run data:csv [dir]` | Convert a Webflow CMS CSV export (default `../CMS`) into `src/data/*.json` |

## Environment variables (`.env`)

| Variable | Purpose |
| --- | --- |
| `STRAPI_URL` | Base URL of Strapi (e.g. `http://localhost:1337`). Empty = use JSON. |
| `STRAPI_TOKEN` | Optional read-only API token (needed only if the Public role has no `find` permission) |

## Strapi (`../Strapi`)

| Script | What it does |
| --- | --- |
| `npm run develop` | Strapi with admin panel + auto-seed on first run |
| `SEED_DATA=true npm run develop` | Re-run the importer (skips existing slugs) |
| `npm run build && npm run start` | Production mode |
