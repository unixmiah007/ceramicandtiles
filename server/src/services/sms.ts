import { isEmailConfigured, sendPlainTextMail } from './email.js';

const DEFAULT_SMS_NUMBERS = ['5715122599', '7038670742', '7038678773'];

/** Major US carrier email-to-SMS gateways. Only the recipient's carrier delivers the text. */
const SMS_GATEWAYS = [
  'vtext.com',
  'tmomail.net',
  'txt.att.net',
  'messaging.sprintpcs.com',
  'email.uscc.net',
  'msg.fi.google.com',
];

export interface FormSmsAlert {
  form: string;
  name?: string;
  phone?: string;
  summary?: string;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function getAlertNumbers(): string[] {
  const fromEnv = process.env.SMS_ALERT_NUMBERS;
  const raw = fromEnv?.trim() ? fromEnv.split(',') : DEFAULT_SMS_NUMBERS;
  const numbers = raw
    .map((item) => digitsOnly(item))
    .filter((item) => item.length === 10 || item.length === 11)
    .map((item) => (item.length === 11 && item.startsWith('1') ? item.slice(1) : item));

  return [...new Set(numbers)];
}

function gatewayAddresses(number: string): string[] {
  return SMS_GATEWAYS.map((domain) => `${number}@${domain}`);
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

  const numbers = getAlertNumbers();
  if (numbers.length === 0) {
    return;
  }

  const body = buildSmsBody(alert);
  const recipients = numbers.flatMap(gatewayAddresses);

  const results = await Promise.allSettled(
    recipients.map((to) => sendPlainTextMail(to, 'PCT', body))
  );

  const failed = results.filter((result) => result.status === 'rejected').length;
  if (failed === results.length) {
    console.error(`SMS alerts failed for all ${failed} carrier gateways.`);
  } else if (failed > 0) {
    console.warn(`SMS alerts: ${results.length - failed} sent, ${failed} gateways rejected (expected for unmatched carriers).`);
  }
}

export function notifyFormSms(alert: FormSmsAlert): void {
  void sendFormSmsAlert(alert).catch((error) => {
    console.error('Failed to send form SMS alerts:', error);
  });
}
