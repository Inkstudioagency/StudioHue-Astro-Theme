# StudioHue — Agency Astro Theme

A bold, dark creative-agency theme for [Astro](https://astro.build) with CMS-driven Services,
Projects and Blog collections — editable in [Strapi](https://strapi.io) or as bundled JSON.

**Live demo:** https://studiohue-astro-theme.vercel.app
**The theme itself lives in [`Astro/`](Astro/) — see [its README](Astro/README.md) for setup, configuration and customisation.**

![StudioHue home page](Astro/screenshots/home.webp)

```sh
cd Astro
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
```

Requires Node ≥ 22.12.

## Repository layout

| Folder | What it is |
| ------ | ---------- |
| [`Astro/`](Astro/) | **The theme.** Astro 7, 12 page designs, content collections, agent handbook in `.claude/skills/`. Deployed to the live demo above. |
| [`Strapi/`](Strapi/) | Optional Strapi 5 CMS: Services / Projects / Blog content types, demo-content seeder and MCP server. See [its README](Strapi/README.md). |
| [`CMS/`](CMS/) | Source CSV exports the demo content was generated from (`npm run data:csv` in `Astro/` regenerates the JSON). |
| [`Template/`](Template/) | The original static HTML/CSS design the theme was ported from — reference only, not part of the build. |

## Working with the CMS

```sh
# 1. CMS (optional — the theme builds without it)
cd Strapi && npm install && npm run develop      # seeds content, admin at :1337/admin

# 2. Theme
cd ../Astro && cp .env.example .env               # STRAPI_URL=http://localhost:1337
npm run dev
```

Without `STRAPI_URL` the theme falls back to the JSON content in `Astro/src/data/`, so it always
builds. AI agents: `.mcp.json` registers the Strapi MCP server for Claude Code (export
`STRAPI_MCP_TOKEN` with a Strapi admin token first).

## Licence

Theme code is MIT. Demo imagery and text are placeholder content. The bundled BDO Grotesk font and
the third-party libraries in `Astro/public/js/` are covered by their own licences — see
[`Astro/README.md`](Astro/README.md#credits--licences).
