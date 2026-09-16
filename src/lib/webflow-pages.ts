// Webflow page ids + the per-page list of selectors that IX3 keeps hidden until the
// page animations run. Both come from the original Webflow export and are consumed by
// public/js/webflow.js (interactions are scoped by page id).
export const SITE_ID = '6aa8d94a34bbb99ae552072f';

export const wfPages = {
  protected: {
    id: "6aa8d94a34bbb99ae5520715",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right",
  },
  notFound: {
    id: "6aa8d94a34bbb99ae5520709",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .not-found-text, [data-wf-target*='[\"6aa8d94a34bbb99ae5520709\",\"deb223b9-c449-3a7c-96aa-088f5d7901d4\"]'], ._404.align-center, .not-found-button-block",
  },
  about: {
    id: "6aa8d94a34bbb99ae552070e",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .approach-title, .vision-text, .team-card, .vision-img, .approach-badge, .vision-info-group, .about-badge, .section-heading.black, .font-regular.black, .value-img, .value-card, .about-single-stat-block, .inner-badge, .hero-heading, .inner-hero-right, .inner-image-wrap",
  },
  blog: {
    id: "6aa8d94a34bbb99ae5520713",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .blog-card-img, .blog-card-main, .blog-card-v2, .blog-card-img-v2, .inner-badge, .hero-heading, .inner-hero-right, .inner-image-wrap",
  },
  contact: {
    id: "6aa8d94a34bbb99ae5520711",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .contact-left-top, .contact-right, .contact-info-top, .hero-heading, .inner-summary-wrap, .inner-hero-right.contact",
  },
  post: {
    id: "6aa8d94a34bbb99ae552070d",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .blog-card-img, .blog-card-main, .inner-badge, .blog-hero-heading, .blog-hero-right, .blog-main-img-wrap, .post-body-content, .blog-card, .post-long-summary, .post-quote-block",
  },
  project: {
    id: "6aa8d94a34bbb99ae552070b",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .project-multi-img, .about-badge, .work-img, .work-card, .faq-info-card.hide-mobile, .project-left, .project-details, .faq-card, .faq-tab-menu, .faq-subtitle, .section-heading.black.center, .inner-badge, .project-heading, .project-info-wrap, .hero-img-wrap",
  },
  serviceDetail: {
    id: "6aa8d94a34bbb99ae552070c",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .about-badge, .service-hero-heading, .inner-hero-right, .hero-img-wrap, .service-details-card, .service-details-content, .service-list-wrap",
  },
  home: {
    id: "6aa8d94a34bbb99ae5520702",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .teatimonial-button-wrap, .tab-menu, .blog-card-img, .expertise-slide, .teatimonial-badge, .home-hero-badge, .hero-heading, .hero-button-wrap, .home-hero-right, .hero-img-wrap, .about-badge, .work-img, .blog-slider, .blog-card, .belive-card, .expertise-heading, .marque-list, .service-card-img, .work-slide, .work-card-img, .marque-wrap, .belive-badge, .animated-text, .rebuild-text, .how-work-card, .belive-image, .font-large, .card-logo, .font-normal.center, .testimonial-paragraph, .service-slider, .testimonial-slider",
  },
  service: {
    id: "6aa8d94a34bbb99ae5520714",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .project-left-bottom, .engage-slide, .faq-info-card.hide-mobile, .faq-left-top, .service-card, .service-card-bottom, .service-arrow-wrap-02, .service-card-main, .service-image, .pricing-card, .faq-card, .faq-tab-menu, .animated-dot.bg-black, .button-text-wrap.bg-black, .faq-subtitle, .about-badge, .section-heading.black.center, .inner-badge, .hero-heading, .inner-hero-right, .inner-image-wrap, .popular-pricing-card",
  },
  styleGuide: {
    id: "6aa8d94a34bbb99ae5520703",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right",
  },
  work: {
    id: "6aa8d94a34bbb99ae5520712",
    hidden: ".footer-text.is-one, .footer-text.is-two, .cta-heading, .font-regular.tertiary, .cta-button-wrap, .cta-top-right, [to-top-2], .footer-large-title, .cta-card, .footer-absolute-bottom, .button-animated-line, .button-arrow-wrap, .button-arrow, .faq-p-wrap, .faq-icon.absolute, [to-top-0s], [to-top-2s], [to-top-4s], [to-top-6s], [to-top-8s], .footer-top-left, .footr-top-right, [title-animation], .animated-dot, .button-text-wrap, .badge, .section-heading, .section-header-right, .work-img, .work-card, .inner-badge, .hero-heading, .work-year, .work-button-wrap",
  },
} as const;

export type WfPageKey = keyof typeof wfPages;
