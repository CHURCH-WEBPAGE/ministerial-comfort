/**
 * Inline SVG “micro” placeholder for next/image `placeholder="blur"`.
 * No network: ships with the bundle so the blur shows immediately while the real image loads.
 */
export const IMAGE_BLUR_DATA_URL =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1">' +
      '<stop offset="0%" stop-color="#e2e8f0"/><stop offset="100%" stop-color="#cbd5e1"/>' +
    '</linearGradient></defs><rect width="8" height="5" fill="url(#g)"/></svg>'
  );
