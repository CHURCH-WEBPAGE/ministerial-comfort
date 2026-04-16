import emailjs from '@emailjs/browser';

export type SupportEmailPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
};

function getEmailJsConfig() {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');
  return { publicKey, serviceId, templateId, siteUrl };
}

/**
 * Sends a unified support notification via EmailJS (contact + event registration).
 * Template params must match variables in your EmailJS HTML template.
 */
export async function sendSupportInquiryEmail(payload: SupportEmailPayload): Promise<void> {
  const { publicKey, serviceId, templateId, siteUrl } = getEmailJsConfig();

  if (!publicKey || !serviceId || !templateId) {
    const missing: string[] = [];
    if (!publicKey) missing.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
    if (!serviceId) missing.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    if (!templateId) missing.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
    throw new Error(
      `Email is not configured. Missing: ${missing.join(', ')}. Add them to .env (or .env.local), save, then restart the dev server so Next.js picks up the values.`
    );
  }

  const templateParams: Record<string, string> = {
    first_name: payload.firstName.trim(),
    last_name: payload.lastName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    note: payload.note.trim(),
    site_url: siteUrl,
    received_at: new Date().toLocaleString('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  await emailjs.send(serviceId, templateId, templateParams, { publicKey });
}
