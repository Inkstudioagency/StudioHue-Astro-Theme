# Adding a new page, route or section

## New static page

1. Copy the page that is closest in layout (e.g. `src/pages/about.astro`) to `src/pages/<route>.astro`.
2. Keep the shell (`<Base>`, `.page-wrapper`, `.hero-area` + `<Header />`, `.main`, `<Cta />`,
   `<Footer page="…" />`).
3. Pass a `page` key to both `<Base>` and `<Footer>`. Use the key of the page you copied from
   (`about`, `work`, `service`, `blog`, `contact`, `styleGuide`, `notFound`, `home`, `project`,
   `serviceDetail`, `post`). The key selects which Webflow interactions run and which elements start
   hidden – see `src/lib/page-effects.ts`. Copying a page's sections with its key keeps the
   animations working.
4. Give the page a `title` and `description` (`<Base title="…" description="…">`).
5. Add it to `src/config/menu.json` if it should appear in the navigation or footer.

## New section on an existing page

Sections are plain HTML blocks using the design-system classes:

```html
<section class="section smoky-black">            <!-- background variants: smoky-black, rangoon-green, warm-ivory, (none)=light -->
  <div class="section-gap spaacer-6xl">           <!-- vertical padding variants: spaacer-6xl, bottom-3xl, top-3xl, bottom-6xl, space-5xl -->
    <div class="w-layout-blockcontainer container w-container">
      <div class="section-header">
        <div class="serction-header-left">
          <Badge text="LABEL" />                    <!-- brand variant: <Badge text="…" class="about-badge" brand /> -->
          <h2 class="section-heading">Title <span class="hiighlight-heading">highlight</span></h2>
        </div>
      </div>
      …
    </div>
  </div>
</section>
```

Elements matching the page's hidden-selector list (e.g. `.section-heading`, `.badge`) are revealed by
scroll interactions automatically.

## New dynamic route (collection)

Follow `src/pages/project/[slug].astro`:

```astro
---
export async function getStaticPaths() {
  const projects = await getProjects();
  return projects.map((entry) => ({ params: { slug: entry.data.slug }, props: { project: entry.data } }));
}
const { project } = Astro.props;
---
```

Rich-text fields are rendered with `set:html` inside a `.w-richtext` element so the design's
typography applies.

## Redirects / trailing slashes

Routes have no trailing slash (`/work`, `/post/<slug>`). Configure redirects in `astro.config.mjs`
(`redirects: { '/old': '/new' }`) if you rename pages.
