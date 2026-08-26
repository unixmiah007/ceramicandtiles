import { isEmailConfigured, sendPlainTextMail } from './email.js';

const DEFAULT_SMS_NUMBERS = ['5715122599', '7038670742', '7038678773'];

/**
 * Verizon is the only remaining major US email-to-SMS gateway that does not
 * hard-bounce unknown numbers. AT&T retired txt.att.net (DNS NXDOMAIN).
 * Google Fi (msg.fi.google.com) and T-Mobile (tmomail.net) return
 * "address not found" for numbers that are not on those networks.
 *
 * Override with full addresses if a phone is T-Mobile, e.g.
 * SMS_ALERT_NUMBERS=5715122599@tmomail.net,7038670742@vtext.com
 */
const DEFAULT_GATEWAY = 'vtext.com';

export interface FormSmsAlert {
  form: string;
  name?: string;
  phone?: string;
  summary?: string;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function normalizeNumber(value: string): string | null {
  const digits = digitsOnly(value);
  if (digits.length === 10) {
    return digits;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return digits.slice(1);
  }
  return null;
}

function getAlertRecipients(): string[] {
  const fromEnv = process.env.SMS_ALERT_NUMBERS;
  const raw = fromEnv?.trim() ? fromEnv.split(',') : DEFAULT_SMS_NUMBERS;
  const recipients: string[] = [];

  for (const item of raw) {
    const trimmed = item.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.includes('@')) {
      recipients.push(trimmed.toLowerCase());
      continue;
    }

    const number = normalizeNumber(trimmed);
    if (number) {
      recipients.push(`${number}@${DEFAULT_GATEWAY}`);
    }
  }

  return [...new Set(recipients)];
}

function buildSmsBody(alert: FormSmsAlert): string {
  const parts = [
    `PCT ${alert.form}`,
    alert.name ? alert.name : '',
    alert.phone ? alert.phone : '',
    alert.summary ? alert.summary : '',
  ]
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.join(' | ').slice(0, 280);
}

export async function sendFormSmsAlert(alert: FormSmsAlert): Promise<void> {
  if (!isEmailConfigured()) {
    return;
  }

  const recipients = getAlertRecipients();
  if (recipients.length === 0) {
    return;
  }

  const body = buildSmsBody(alert);
  const results = await Promise.allSettled(
    recipients.map((to) => sendPlainTextMail(to, 'PCT', body))
  );

  const failed = results.filter((result) => result.status === 'rejected').length;
  if (failed === results.length) {
    console.error(`SMS alerts failed for all ${failed} recipients.`);
  } else if (failed > 0) {
    console.warn(`SMS alerts: ${results.length - failed} sent, ${failed} rejected.`);
  }
}

export function notifyFormSms(alert: FormSmsAlert): void {
  void sendFormSmsAlert(alert).catch((error) => {
    console.error('Failed to send form SMS alerts:', error);
  });
}
