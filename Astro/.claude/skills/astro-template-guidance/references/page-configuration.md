# Site & page configuration

## `src/config/config.json`

| Key | Used by |
| --- | --- |
| `site.title`, `site.title_suffix` | `SeoMeta` – page titles become `"<Page> - StudioHue - Agency Astro Theme"` |
| `site.base_url` | `astro.config.mjs` `site` → absolute OG image URLs |
| `site.logo`, `site.logo_alt` | `Header` |
| `site.favicon*`, `site.webclip*` | `Base` `<link rel="icon">` tags |
| `metadata.meta_title / meta_description / meta_image` | default SEO values (home page) |
| `fonts.google_families` | WebFont loader in `Base` (BDO Grotesk is self-hosted) |
| `contact.*` | `Cta` cards and the contact page |
| `cta.*` | `Cta` heading, copy, button, image, "12K+ Worldwide Client" label |
| `footer.*` | `Footer` newsletter copy, wordmark, copyright / credit links |
| `strapi.collections` | Strapi API ids (`services`, `projects`, `posts`) |

## `src/config/menu.json`

- `main` – navbar links (`name`, `url`)
- `nav_button` – the "Let’s Talk" button
- `footer` – four columns: `{ title, links: [{ name, url, target? }] }`
- `footer_bottom` – "404", "Licenses", "Back to top ↑"
- `social` – contact-page social icons (`icon`: facebook | x | instagram | linkedin)

Current-page highlighting (`aria-current`, `w--current`) is computed from `Astro.url.pathname`.

## Per-page SEO

Pass `title`, `description` and optionally `image` / `rawTitle` to `<Base>`:

```astro
<Base page="work" title="Work" description="Selected projects …">
```

Detail pages use the entry's own fields (`title={project.title} rawTitle`).

## Forms

The newsletter, contact and password forms are Webflow-style forms (`.w-form`). Point their `action`
to your form backend (Formspree, Netlify Forms, an API route, …) – the markup, success and error
messages are already in place.
