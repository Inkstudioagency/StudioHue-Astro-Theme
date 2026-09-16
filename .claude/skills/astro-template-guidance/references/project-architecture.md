# Project architecture

StudioHue is a static Astro 7 site. It is a 1:1 port of a Webflow design, so the HTML/CSS
follow Webflow's class conventions and the interactions run on Webflow's exported runtime.

## Data flow

```
src/config/*.json ──┐
                    ├─▶ layouts/Base.astro + components ─▶ pages/*.astro ─▶ dist/
content collections ┘
   ▲
   │ src/content.config.ts  (zod schemas)
   │ src/loaders/strapi.ts  (content-layer loader)
   │
   ├── Strapi REST  (STRAPI_URL set & reachable)  ─▶ normalised entries
   └── src/data/*.json (fallback)                 ─▶ entries as-is
```

- `src/lib/content.ts` – typed helpers (`getServices`, `getProjects`, `getPosts`,
  `getFeaturedPost`, `getRegularPosts`, URL builders, `formatDate`). Pages only use these.
- `src/lib/strapi.ts` – REST client, media URL helper, `richText()` (HTML passthrough / Markdown → HTML).
- `src/lib/webflow-pages.ts` – Webflow page ids + per-page "hidden until animated" selector lists,
  consumed by `Base.astro` (`data-wf-page` attribute + inline `<style>`).

## Page anatomy

Every page renders the same shell:

```astro
<Base page="work" title="Work" description="…">
  <div class="page-wrapper">
    <div class="hero-area">
      <Header />
      <section class="section">…hero…</section>
    </div>
    <div class="main">
      …sections…
      <Cta />
    </div>
    <Footer page="work" />
  </div>
</Base>
```

`hero-area` is the dark top block (navbar + hero); `main` holds the remaining sections. The home page
places the footer inside `main` (as in the original design); every other page places it after.

## Runtime scripts (order matters)

`Base.astro` loads, at the end of `<body>`:

1. `/js/jquery-3.5.1.min.js`
2. `/js/webflow.js` – Webflow runtime: navbar, sliders, tabs, forms, background video, IX2/IX3 interactions
3. `/js/gsap.min.js`, `/js/SplitText.min.js`, `/js/ScrollTrigger.min.js` – used by IX3 and site.js
4. `/js/lenis.min.js`
5. `/js/site.js` – Lenis smooth scroll + `[data-counter]` number animation

All of them are classic scripts (`is:inline`) because `webflow.js` expects globals (`jQuery`, `gsap`).
`webflow.js` contains one small patch (search for "StudioHue Astro patch"): the exported bundle
carries every page's interactions, so `register()` filters them by the current `data-wf-page`.

## Static assets

- `public/images/` – design imagery (with Webflow's responsive `-p-500/-p-800/…` variants)
- `public/images/cms/` – images referenced by the JSON collections
- `public/videos/` – home showreel background video + poster
- `src/fonts/` + `src/styles/` – bundled by Vite (hashed in `dist/_astro/`)
