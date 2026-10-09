# MACCIA Feature Implementation

Delivery date: 9 October 2026

## Frontend features

- **MACCIA Media Connect** with YouTube/Shorts click-to-play embeds, privacy-enhanced YouTube URLs, Instagram link cards, uploaded video/image support, captions, category labels, original-post links, pagination dots, previous/next controls and pause/play.
- Carousel defaults to seven seconds, accepts the administrator-configured interval, loops safely, pauses on hover/focus/tab hiding/media playback and respects reduced-motion preferences.
- Responsive media presentation: three desktop cards, two tablet cards and one mobile card.
- **Discover Our Business Community** with client-side search, industry/city filters, featured state, profiles, approved websites and MACCIA-routed enquiries.
- **Explore Business Opportunities** with moderated public cards and a secure enquiry workflow that does not expose the opportunity contact address.
- **Upcoming Business Events** reuses the existing event source, excludes past events, provides industry/city filters and `.ics` calendar downloads.
- **Member Stories & Business Achievements** reuses approved testimonials and displays an explicit empty state until authorised stories exist.
- **Grow Your Business with MACCIA** membership conversion section with carefully qualified benefits and three calls to action.
- Short membership enquiry form with browser validation, consent, honeypot spam protection, duplicate protection and clear feedback.
- Homepage section enable/disable and order are controlled by persistent site settings.

## MongoDB models added

- `HomepageMedia`
- `MemberBusiness`
- `BusinessOpportunity`
- `OpportunityEnquiry`
- `MembershipEnquiry`

Media files remain in persistent Cloudinary/object storage; MongoDB stores only URLs, storage keys and searchable metadata.

## APIs added

### Public

- `GET /api/public/homepage-media`
- `GET /api/public/member-businesses`
- `GET /api/public/member-businesses/:slug`
- `GET /api/public/opportunities`
- `POST /api/public/opportunities/:id/enquire`
- `GET /api/public/opportunities/:id`
- `POST /api/public/membership-enquiries`

### Protected administration

- `GET|POST /api/admin/homepage-media`
- `GET|PATCH|DELETE /api/admin/homepage-media/:id`
- `POST /api/admin/homepage-media/upload`
- `PATCH /api/admin/homepage-media/reorder`
- `GET|POST /api/admin/member-businesses`
- `PATCH|DELETE /api/admin/member-businesses/:id`
- `GET|POST /api/admin/opportunities`
- `PATCH|DELETE /api/admin/opportunities/:id`
- `GET /api/admin/opportunities/enquiries`
- `GET /api/admin/membership-enquiries`

## Administration delivered

- Homepage media creation/editing, publication state, scheduling, preview, secure upload, deletion and drag-and-drop ordering.
- Member business creation/editing, consent, approval, featured/publication state and deletion.
- Opportunity creation/editing, moderation state, featured state, expiry, protected contact address, card image upload/replace, supporting detail link and display order.
- Membership and opportunity enquiry review through authenticated administration modules.
- Configurable media interval and JSON-based homepage section management in Settings.

## Principal modified source files

- `frontend/src/App.tsx`
- `frontend/src/MediaCarousel.tsx`
- `frontend/src/PremiumImageCard.tsx`
- `frontend/src/PremiumImageCard.test.tsx`
- `frontend/src/styles.css`
- `backend/src/app.ts`
- `backend/src/models/Settings.ts`
- `backend/src/controllers/public/homepage.controller.ts`
- `backend/src/controllers/public/publicEvents.controller.ts`
- `backend/src/middleware/upload.ts`
- `backend/src/config/cloudinary.ts`
- New feature models, controllers and routes under `backend/src`.

No unapproved member listing, opportunity, media item or testimonial is seeded or fabricated.

## Global image-card system

- Reusable full-bleed image card with Heritage Gold category treatment, charcoal gradient, Poppins title, gold arrow, 12px radius and a consistent 300ms interaction language.
- Applied conditionally to image-backed services, news, events, member listings, opportunities and approved member stories. Text-only downloads, forms, tables, statistics and media players retain purpose-built layouts.
- Whole-card navigation resolves to real news, event, member, opportunity or story detail pages; no placeholder `#` targets are used.
- Touch devices keep the CTA visible, keyboard focus has a high-contrast gold outline, reduced-motion users do not receive transforms, and offscreen images lazy-load.
