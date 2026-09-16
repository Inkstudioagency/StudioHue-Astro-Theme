# Components

All components live in `src/components/`. They render the exact markup of the original design, so
keep the class names when composing them.

| Component            | Props                                                   | Purpose |
| -------------------- | ------------------------------------------------------- | ------- |
| `Header`             | –                                                       | Navbar; links from `menu.json`; marks the current page (`w--current`). |
| `Footer`             | `page` (WfPageKey)                                      | Newsletter form, 4 link columns, bottom links, wordmark. |
| `Cta`                | –                                                       | "Ready for the next step?" block + contact cards (`config.json → cta / contact`). |
| `SeoMeta`            | `title?`, `description?`, `image?`, `rawTitle?`         | `<title>` + OG/Twitter tags. Title gets `site.title_suffix` unless `rawTitle`. |
| `Badge`              | `text`, `class?` (default `badge`), `brand?`            | Label with star icon. Wrapper classes: `badge`, `about-badge`, `inner-badge`, `home-hero-badge`, `belive-badge`, `badge-v2`, `teatimonial-badge`, `approach-badge`. |
| `BadgeIcon`          | `class?`                                                | The star SVG only. |
| `PrimaryButton`      | `label`, `href`, `variant?`, `target?`                  | Pill button. Variants: `base` (brand), `secondary` (light, navbar), `bg-black`, `pricing`, `pricing-primary`. |
| `ArrowLink`          | `label`, `href`, `black?`, `hero?`, `current?`          | Text link with double-arrow hover + animated underline (`.blog-button`). |
| `SliderArrows`       | `class?` (`work-slider-button` or `expertise-slide-button`) | Prev/next arrows for a `.w-slider`. |
| `WorkCard`           | `project`, `sizes?`                                     | Project card (serial, pills, cover, title, summary, year). |
| `ServiceCard`        | `service`, `slide?`                                     | Home service card; `slide` = mobile slider variant. |
| `ServiceListCard`    | `service`                                               | Full-width row on `/service` with mouse-follow image. |
| `BlogCard`           | `post`, `sizes?`                                        | Compact post card (home + post detail). |
| `BlogCardMain`       | `post`                                                  | Post card on `/blog`. |
| `FeaturedPostCard`   | `post`                                                  | Large featured card on `/blog`. |

`project`, `service` and `post` props are collection entries (`CollectionEntry<'projects'>` etc.) –
get them from `src/lib/content.ts`.

## Example – a list of the latest posts

```astro
---
import BlogCard from '../components/BlogCard.astro';
import { getRegularPosts } from '../lib/content';
const posts = (await getRegularPosts()).slice(0, 3);
---
<div class="post-collection-wrap">
  <div class="w-dyn-list">
    <div role="list" class="post-collection-list w-dyn-items">
      {posts.map((post) => (
        <div role="listitem" class="w-dyn-item"><BlogCard post={post} /></div>
      ))}
    </div>
  </div>
</div>
```

Keep the `.w-dyn-list / .w-dyn-items / .w-dyn-item` wrappers – the stylesheet and interactions
target them.

## Sliders, tabs, FAQ

These are Webflow widgets driven by `public/js/webflow.js` and need their `data-*` attributes
(`data-animation`, `data-duration`, `data-w-tab`, …) exactly as in the existing pages. Duplicate a
working block rather than writing one from scratch.
