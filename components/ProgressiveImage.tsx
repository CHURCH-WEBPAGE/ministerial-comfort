import NextImage, { type ImageProps } from 'next/image';
import { IMAGE_BLUR_DATA_URL } from '@/lib/imagePlaceholder';

/**
 * Same API as `next/image`, defaulting to an instant inline blur until the image loads.
 * Set `placeholder="empty"` to match stock Next behavior (e.g. optional for tiny SVGs).
 */
export default function Image({ placeholder, blurDataURL, ...rest }: ImageProps) {
  if (placeholder === 'empty') {
    return <NextImage {...rest} placeholder="empty" />;
  }

  return (
    <NextImage
      {...rest}
      placeholder="blur"
      blurDataURL={blurDataURL ?? IMAGE_BLUR_DATA_URL}
    />
  );
}
