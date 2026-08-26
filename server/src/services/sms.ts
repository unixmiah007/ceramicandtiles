const DEFAULT_SMS_NUMBERS = ['5715122599', '7038670742', '7038678773'];

export interface FormSmsAlert {
  form: string;
  name?: string;
  phone?: string;
  summary?: string;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function toE164(value: string): string | null {
  const source = value.includes('@') ? value.split('@')[0] : value;
  const digits = digitsOnly(source);
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  if (digits.length > 11) {
    return `+${digits}`;
  }
  return null;
}

function isTwilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      process.env.TWILIO_PHONE_NUMBER?.trim()
  );
}

function getAlertNumbers(): string[] {
  const fromEnv = process.env.SMS_ALERT_NUMBERS;
  const raw = fromEnv?.trim() ? fromEnv.split(',') : DEFAULT_SMS_NUMBERS;
  const numbers = raw
    .map((item) => toE164(item.trim()))
    .filter((item): item is string => Boolean(item));

  return [...new Set(numbers)];
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

  return parts.join(' | ').slice(0, 1500);
}

async function sendTwilioSms(to: string, body: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!.trim();
  const authToken = process.env.TWILIO_AUTH_TOKEN!.trim();
  const from = process.env.TWILIO_PHONE_NUMBER!.trim();
  const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
  });

  if (!response.ok) {
    const raw = await response.text();
    let detail = `HTTP ${response.status}`;
    try {
      const payload = JSON.parse(raw) as { code?: number; message?: string };
      detail = [payload.code, payload.message].filter(Boolean).join(' ') || detail;
    } catch {
      if (raw) {
        detail = raw.slice(0, 300);
      }
    }
    throw new Error(`Twilio SMS to ${to} failed: ${detail}`);
  }
}

export async function sendFormSmsAlert(alert: FormSmsAlert): Promise<void> {
  if (!isTwilioConfigured()) {
    console.warn('SMS alerts skipped: Twilio is not configured.');
    return;
  }

  const numbers = getAlertNumbers();
  if (numbers.length === 0) {
    return;
  }

  const body = buildSmsBody(alert);
  const results = await Promise.allSettled(numbers.map((to) => sendTwilioSms(to, body)));

  const failed = results.filter((result) => result.status === 'rejected');
  if (failed.length > 0) {
    for (const result of failed) {
      if (result.status === 'rejected') {
        console.error(result.reason);
      }
    }
  }

  if (failed.length === results.length) {
    console.error(`SMS alerts failed for all ${failed.length} Twilio recipients.`);
  }
}

export function notifyFormSms(alert: FormSmsAlert): void {
  void sendFormSmsAlert(alert).catch((error) => {
    console.error('Failed to send form SMS alerts:', error);
  });
}
