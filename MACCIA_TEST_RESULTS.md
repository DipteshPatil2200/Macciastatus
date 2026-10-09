# MACCIA Test Results

Test date: 9 October 2026

## Results

| Check | Result |
| --- | --- |
| Backend feature/security tests | Passed — 18/18 |
| Frontend component tests | Passed — 6/6 |
| Backend strict TypeScript production build | Passed |
| Frontend TypeScript + Vite production build | Passed |
| Backend production dependency audit | Passed — 0 known vulnerabilities |
| Frontend production dependency audit | Passed — 0 known vulnerabilities |
| Browser console | Passed — no errors or warnings |
| Responsive overflow | Passed at 360, 390, 768, 1024, 1440 and 1920 CSS pixels |
| Mobile menu | Passed — visible, opens and exposes navigation |

Frontend production output:

- HTML: 1.10 kB (0.55 kB gzip)
- CSS: 33.82 kB (7.62 kB gzip)
- JavaScript: 284.93 kB (84.76 kB gzip)

## Automated coverage

- Admin media model creation and publication validation.
- Standard YouTube, YouTube Shorts and Instagram URL validation.
- Invalid social URL rejection.
- Draft media public-visibility protection.
- Media ordering validation.
- Upload MIME/extension acceptance and mismatch rejection.
- Administrator role acceptance and unauthorised-role rejection.
- Member directory filtering and consent state.
- Opportunity publication/expiry validation.
- Membership-enquiry fingerprint normalization.
- Carousel automatic rotation, video-playback pause, mobile card count and keyboard navigation.
- Premium image-card internal and external navigation, safe external-link attributes, accessible naming, lazy image loading and touch CTA presence.
- Opportunity image/detail-link persistence, display ordering and insecure external image rejection.

## Browser verification

- All eight managed homepage sections rendered in configured order.
- Media, member, opportunity, event and story empty states rendered truthfully with an empty database.
- Membership conversion and enquiry sections rendered with accessible form controls.
- Desktop and mobile layouts showed no horizontal overflow.

The card-redesign production routes returned HTTP 200 for `/`, `/events`, and a client-routed opportunity detail URL. The Windows browser-control helper could not initialize for the final hover/focus capture (`failed to write kernel assets: path not found`), so pointer and keyboard behavior for this revision are covered by component assertions and explicit CSS focus/hover/touch/reduced-motion rules rather than a new automated screenshot pass.

## Environment-dependent checks

- Live MongoDB persistence requires a configured test or production `MONGODB_URI`.
- Live uploads require approved Cloudinary credentials.
- Real YouTube/Instagram availability depends on the source owner and platform embedding policy.
- Optional email notifications are not enabled because no approved mail provider credentials were supplied.

## Commands

```text
cd backend && npm test
cd backend && npm run build
cd backend && npm audit --omit=dev
cd frontend && npm test
cd frontend && npm run build
cd frontend && npm audit --omit=dev
```
