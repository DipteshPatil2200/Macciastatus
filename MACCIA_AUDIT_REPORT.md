# MACCIA Repository Audit

Audit date: 8 October 2026

## Executive finding

The repository contained a substantial Express/TypeScript/MongoDB API and an empty frontend directory. The API covered public content, administration, membership applications, venue enquiries, uploads and authentication, but it did not install or compile cleanly and was not safe to deploy unchanged. A new React/Vite frontend has now been added and the critical build/security defects listed below have been addressed.

## Existing architecture

- Backend: Node.js, Express, TypeScript, Mongoose/MongoDB.
- Authentication: bearer JWT for administrator accounts; `admin` and `superadmin` roles.
- Storage: local Multer staging plus optional Cloudinary upload.
- Content models: hero slides, statistics, settings, news, events, services, leadership, committees, offices, gallery, video, downloads, announcements, venues, testimonials and partners.
- Workflow models: contact enquiries, newsletter subscriptions, membership applications and venue bookings.
- Frontend before this delivery: directory structure only; no package manifest or source files.
- Deployment before this delivery: no production guide, environment template, root orchestration or hosting configuration.

## Defects found and repaired

- Backend dependency installation failed because declared package versions were unavailable.
- Cloudinary was imported but not declared.
- JWT authentication used a hard-coded fallback secret.
- MongoDB and JWT configuration were not validated at startup.
- API-wide rate limiting was defined but not applied.
- Upload validation accepted a file when either its extension or MIME type appeared valid and allowed unnecessary active formats.
- Upload directories were not created automatically.
- Confirmed venue-booking collisions were not checked.
- Venue submissions trusted the client-supplied venue name and accepted invalid/past dates.
- Announcement administration routes were missing.
- TypeScript compilation had multiple strict-mode errors.
- Default institutional settings contained unverified names, address, phone and statistics.
- No sitemap, robots policy, environment sample, admin bootstrap script or repository ignore policy existed.

## Implemented public experience

- Responsive institutional homepage in the required section order.
- Sticky navigation, accessible dropdown structure, mobile menu, English/Marathi control, site search, member and membership links.
- About, history, vision, founder, president, leadership, committee, membership, service, newsroom, event, gallery, publication, download, election notice, privacy, accessibility and contact routes.
- Database-backed membership, contact and newsletter submissions.
- API-backed news, event, download, homepage and admin content loading with safe empty states.
- Verified contact details, office locations, service descriptions and statistics drawn from the public MACCIA site.
- SEO base metadata, sitemap, robots policy, semantic HTML, keyboard skip link, reduced-motion support and responsive layouts.

## Implemented administration experience

- Secure login against the existing API.
- Responsive administration shell with modules for homepage, announcements, news, events, services, leadership, committees, membership applications, venue bookings, gallery, documents, enquiries and settings.
- Searchable record views and protected API access.
- Existing backend CRUD retained for supported modules; announcement CRUD added.
- Environment-controlled superadmin bootstrap script.

## Incomplete or approval-dependent

- Member accounts, member dashboard, renewal, payment history and receipt generation need an approved member identity model and business rules.
- Payment gateway is intentionally not activated: provider, GST, fees, credentials and webhook endpoint approval are required.
- Email automation is not active: SMTP/provider, templates, sender identity and retention policy are required.
- Venue rates and capacity are not seeded because business data must be approved.
- AI assistant/search/content drafting are not enabled because provider, data corpus, budgets and governance are unapproved.
- Admin creation/edit forms currently rely on the API record endpoints; rich per-module field editors, draft preview and audit logs need a second implementation phase.
- No production data was migrated or modified.

## Reference website audit

The public reference at `https://maccia.org.in/` was reviewed for institutional facts, service scope, public events, office contact details and venue-booking structure. Content was used conservatively; unsupported office-bearer lists, fee schedules and achievements were not fabricated.

