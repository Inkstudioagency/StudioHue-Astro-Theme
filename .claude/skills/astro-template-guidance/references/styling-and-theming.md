# Styling and theming

The theme does **not** use Tailwind. Styling is the design-system stylesheet exported from the
original design, loaded by `src/layouts/Base.astro` in this order:

1. `src/styles/normalize.css`
2. `src/styles/webflow.css` – widget base styles (nav, slider, tabs, forms, rich text)
3. `src/styles/studiohue.webflow.css` – the design system: custom properties + all component classes
4. `src/styles/lenis.css`
5. `src/styles/theme.css` – **your overrides** (empty by default)

## Design tokens

Everything is driven by CSS custom properties declared on `:root` in `studiohue.webflow.css`
(search for `--color--`, `--_typography---`, `--_sizes---`). Override them in `theme.css`:

```css
:root {
  --color--primitive--brand--500: #be3508;                 /* accent (buttons, highlights) */
  --color--primitive--neutral--950: #0f0d0b;               /* dark sections */
  --_typography---typography--font-family--heading-font-family: Bdogrotesk, Arial, sans-serif;
  --_typography---typography--font-family--body-font-family: Geist, sans-serif;
}
```

`/style-guide` shows the palette (`#be3508` primary, `#ffffff`, `#f8f9fa` body, `#0f0d0b`
primitive), the type scale (H1 5.25rem … H6 1.25rem, body 1.125rem/1rem/0.875rem) and button variants.

## Section backgrounds

`.section` (light ivory), `.section.smoky-black`, `.section.rangoon-green`, `.section.warm-ivory`,
`.hero-area` (dark). Spacing: `.section-gap` + `spaacer-6xl`, `bottom-6xl`, `bottom-3xl`,
`top-3xl`, `space-5xl`, `cta`, `footer`.

## Fonts

- BDO Grotesk – self-hosted in `src/fonts/` (`@font-face` in `studiohue.webflow.css`)
- Geist, Instrument Serif – Google Fonts via the WebFont loader (`config.json → fonts.google_families`)

## Dark mode

The design is single-theme (dark hero/footer, light content sections). There is no light/dark
toggle; adapt the tokens above if you need one.

## Animations

Reveal/hover interactions are defined inside `public/js/interactions.js` (Webflow IX3) and keyed to the
page id set by `<Base page="…">`. Elements listed in `src/lib/page-effects.ts → hidden` start
invisible and are revealed by those interactions; if you add a new class to an animated block,
keep the original classes so the reveal still fires. Site-specific JS is in `public/js/site.js`.
