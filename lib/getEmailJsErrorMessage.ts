import { EmailJSResponseStatus } from '@emailjs/browser';

/**
 * Turns EmailJS failures (and generic errors) into a user-visible string.
 */
export function getEmailJsErrorMessage(error: unknown): string {
  if (error instanceof EmailJSResponseStatus) {
    const raw = error.text?.trim();
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { message?: string; text?: string; error?: string };
        const fromJson = parsed.message ?? parsed.text ?? parsed.error;
        if (typeof fromJson === 'string' && fromJson.trim()) {
          return fromJson.trim();
        }
      } catch {
        // response body is plain text
      }
      return raw;
    }
    return `The email service returned an error (HTTP ${error.status}).`;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Something went wrong while sending. Please try again.';
}
