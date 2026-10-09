# MACCIA Media Administration Guide

## Access

Sign in at `/admin/login`, then open **Homepage Media** in the administration navigation. Only authenticated administrator and super-administrator accounts can use these APIs.

## Add social media

1. Choose YouTube, YouTube Short, Instagram Post or Instagram Reel.
2. Enter the public HTTPS source URL, title and optional caption.
3. Add an optional approved thumbnail.
4. Choose Draft, Scheduled, Published or Archived.
5. Enable **Display on homepage** and save.

YouTube URLs are parsed and validated by the server. Public YouTube playback uses `youtube-nocookie.com` and begins only after a visitor clicks. Instagram is represented by a compliant link card because embed availability is controlled by Meta and cannot be guaranteed.

## Upload approved media

1. Select **Upload media**.
2. Choose JPG, JPEG, PNG, WebP, MP4 or WebM.
3. After upload, add the title, caption, publication state and homepage setting.
4. Save the item.

Maximum upload size is 75 MB. MIME type and filename extension must both match. Production upload requires configured Cloudinary credentials; local server disk is only temporary upload staging.

## Publication rules

- Draft and archived records never appear publicly.
- Scheduled records remain private until `publishAt`, then become publicly eligible automatically. A Published record with a future `publishAt` also remains private until that date.
- **Display on homepage** can hide a published item without deleting it.
- Drag media table rows to change display order.
- Use Preview to verify the original source before publication.

## Carousel settings

Open **Settings** and change **Media carousel interval**. Valid values are 3,000–30,000 milliseconds; 7,000 milliseconds is the default.

Homepage section configuration contains each section’s `enabled`, `order`, `heading`, `description`, and optional CTA values. Keep every `key` unchanged when editing the JSON.

## Rights and privacy

- Upload only media MACCIA is authorised to publish.
- Do not download or republish third-party Instagram content.
- Confirm thumbnails and captions are approved.
- Never place private member contact details in media captions.
