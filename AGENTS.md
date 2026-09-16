# StudioHue Astro theme – agent notes

## Start here

Read `.claude/skills/astro-template-guidance/SKILL.md` and the matching file in its `references/`
folder before changing pages, components, content, config, styles or scripts. It documents how this
template is structured (config JSON, content collections with a Strapi loader + JSON fallback,
Webflow interaction runtime keyed by page).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

`npm run build` must keep passing without Strapi running (JSON fallback) and `npm run check` must stay
clean.

## Fidelity rule

The markup mirrors the original design 1:1. Keep Webflow class names, wrapper structure
(`.w-dyn-list` / `.w-slider` / `.w-tabs`) and the `page` key passed to `<Base>` / `<Footer>` –
the interactions in `public/js/webflow.js` depend on them.

## Documentation

Full documentation: https://docs.astro.build

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
