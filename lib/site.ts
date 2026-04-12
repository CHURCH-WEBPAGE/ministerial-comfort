/** Canonical site origin for metadata, Open Graph, and absolute URLs. Set in production. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  const netlify = process.env.URL?.trim();
  if (netlify?.startsWith('http')) return netlify.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  return 'http://localhost:3000';
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

export const SITE_NAME = 'Ministerial Comfort and Renewal (MCR)';

export const SITE_DESCRIPTION =
  'Restoring hope and renewal for ministers support, counseling, and resources through the Foursquare Gospel Church in Nigeria (MCR).';

/**
 * Default link-preview image: `public/assets/og-share.jpg` (1200×630, logo centered on brand blue).
 * Regenerate after logo changes: `npm run build:og-share` (requires devDependency `jimp`).
 */
export const DEFAULT_OG_IMAGE_PATH = '/assets/og-share.jpg';
