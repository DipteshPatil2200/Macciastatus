# MACCIA Deployment Checklist

## Required configuration

- [ ] Provision production MongoDB with backups and a least-privilege application user.
- [ ] Set `MONGODB_URI`.
- [ ] Generate `JWT_SECRET` with at least 32 random characters.
- [ ] Set production `CORS_ORIGINS` exactly.
- [ ] Configure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` for permanent image/video storage.
- [ ] Set frontend `VITE_API_URL` when the API uses a different origin.
- [ ] Configure an HTTPS domain and reverse proxy for `/api/*`.

## Content and permissions

- [ ] Confirm MACCIA owns or is licensed to publish every uploaded image/video and thumbnail.
- [ ] Obtain member consent before approving public business listings or contact-related features.
- [ ] Moderate every business opportunity before Published status.
- [ ] Approve member stories/testimonials and associated logos/photos.
- [ ] Confirm final membership benefit wording.
- [ ] Verify official YouTube and Instagram source URLs.
- [ ] Obtain Meta/API permissions only if MACCIA later replaces link cards with official dynamic embeds.

## Security and operations

- [ ] Run `npm ci`, tests, production builds and audits in CI.
- [ ] Seed the first administrator once, then remove seed credentials.
- [ ] Confirm administrator roles and deactivate unused accounts.
- [ ] Enable HTTPS, secure headers, request-size limits and platform rate limits.
- [ ] Configure malware/content review for production uploads if required by policy.
- [ ] Set MongoDB and Cloudinary retention/back-up policies.
- [ ] Configure monitoring for `/health`, API errors, upload failures and storage quota.
- [ ] Document incident response and rollback owners.

## Release validation

- [ ] Verify `/health` returns HTTP 200.
- [ ] Verify administrator login and each new administration module.
- [ ] Create one Draft media item and confirm it is not public.
- [ ] Publish one approved media item and verify carousel playback/pause/order.
- [ ] Upload an approved test image and video, then remove them after validation.
- [ ] Approve a test member listing and verify filters/profile.
- [ ] Publish a test opportunity and verify enquiry persistence without exposing contact email.
- [ ] Submit a membership enquiry and verify duplicate protection and admin visibility.
- [ ] Verify upcoming events exclude past dates and calendar downloads open correctly.
- [ ] Repeat mobile, tablet and desktop accessibility/overflow checks.

## Remaining external inputs

- Production MongoDB connection and credentials.
- Production Cloudinary account and storage policy.
- Approved production domain, hosting and TLS configuration.
- Optional transactional email provider credentials and approved notification recipients.
- Authorised real media, member listings, opportunities and testimonials.

Deployment was not performed from this workspace because production infrastructure and credentials were not supplied.
