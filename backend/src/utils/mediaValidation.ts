export const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function parseYouTubeId(input: string): string | null {
  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    let id = '';
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || '';
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
      else id = url.pathname.match(/^\/(?:shorts|embed)\/([^/?]+)/)?.[1] || '';
    }
    return YOUTUBE_ID_PATTERN.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function isInstagramUrl(input: string): boolean {
  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    return host === 'instagram.com' && /^\/(?:p|reel)\/[A-Za-z0-9_-]+\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}

export const publicMediaQuery = (now = new Date()) => ({
  homepageEnabled: true,
  $or: [
    { status: 'published', $or: [{ publishAt: { $exists: false } }, { publishAt: null }, { publishAt: { $lte: now } }] },
    { status: 'scheduled', publishAt: { $lte: now } },
  ],
});

export function normalizeMediaInput(body: Record<string, unknown>) {
  const type = String(body.type || '');
  const sourceUrl = typeof body.sourceUrl === 'string' ? body.sourceUrl.trim() : '';
  let platformMediaId: string | undefined;
  if (type === 'youtube' || type === 'youtube_short') {
    platformMediaId = parseYouTubeId(sourceUrl) || undefined;
    if (!platformMediaId) throw new Error('A valid YouTube video, Short or embed URL is required');
  }
  if ((type === 'instagram_post' || type === 'instagram_reel') && !isInstagramUrl(sourceUrl)) {
    throw new Error('A valid public Instagram post or Reel URL is required');
  }
  if ((type === 'uploaded_video' || type === 'uploaded_image') && !/^(https:\/\/|\/uploads\/)/.test(sourceUrl)) {
    throw new Error('Uploaded media requires a persistent HTTPS or approved internal media URL');
  }
  if (body.status === 'scheduled' && !body.publishAt) throw new Error('Scheduled media requires a publication date');
  return { ...body, sourceUrl: sourceUrl || undefined, platformMediaId };
}

export const matchesMemberFilters = (
  item: { companyName: string; industry: string; city: string; description?: string },
  search = '', industry = '', city = '',
) => {
  const haystack = `${item.companyName} ${item.industry} ${item.city} ${item.description || ''}`.toLowerCase();
  return (!search || haystack.includes(search.toLowerCase())) &&
    (!industry || item.industry.toLowerCase() === industry.toLowerCase()) &&
    (!city || item.city.toLowerCase() === city.toLowerCase());
};

export const membershipEnquiryFingerprint = (email: string, mobile: string, service: string) =>
  `${email.trim().toLowerCase()}|${mobile.replace(/\D/g, '')}|${service.trim().toLowerCase()}`;

export function isAllowedMediaUpload(mimetype: string, filename: string): boolean {
  const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  const allowed: Record<string, string[]> = {
    'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'],
    'video/mp4': ['.mp4'], 'video/webm': ['.webm'],
  };
  return Boolean(allowed[mimetype]?.includes(extension));
}
