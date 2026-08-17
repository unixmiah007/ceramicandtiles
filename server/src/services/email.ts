import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { ContactFormData, WizardSubmission } from '../types';

const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'PortilloCeramicTile@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM || SMTP_USER || 'PortilloCeramicTile@gmail.com';

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'Email is not configured. Set SMTP_USER and SMTP_PASS in your environment.'
    );
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  return transporter;
}

function buildEmailContent(submission: ContactFormData) {
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const text = [
    'New quote request from the Portillo Ceramic and Tile website',
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    `Project Type: ${submission.projectType}`,
    '',
    'Project Details:',
    submission.message,
    '',
    `Submitted: ${submittedAt}`,
  ].join('\n');

  const html = `
    <h2>New Quote Request</h2>
    <p>A new inquiry was submitted from the Portillo Ceramic and Tile website.</p>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Name</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.name)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Email</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">
          <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Phone</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.phone)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Project Type</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.projectType)}</td>
      </tr>
    </table>
    <h3 style="margin-top: 24px;">Project Details</h3>
    <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(submission.message)}</p>
    <p style="color: #5a6a7a; font-size: 14px; margin-top: 24px;">Submitted: ${escapeHtml(submittedAt)}</p>
  `;

  return { text, html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendContactEmail(submission: ContactFormData): Promise<void> {
  const mailer = getTransporter();
  const { text, html } = buildEmailContent(submission);

  await mailer.sendMail({
    from: `"Portillo Ceramic and Tile Website" <${CONTACT_EMAIL_FROM}>`,
    to: CONTACT_EMAIL_TO,
    replyTo: `"${submission.name}" <${submission.email}>`,
    subject: `Quote Request: ${submission.projectType} – ${submission.name}`,
    text,
    html,
  });
}

function buildWizardEmailContent(submission: WizardSubmission) {
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const tileList = submission.tileSamples.length
    ? submission.tileSamples.join(', ')
    : 'None selected';

  const text = [
    'New quote wizard submission from the Portillo Ceramic and Tile website',
    '',
    'CONTACT',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    '',
    'PROPERTY',
    `Type: ${submission.propertyType}`,
    `Location: ${submission.location}`,
    `Description: ${submission.propertyDescription}`,
    '',
    'PROJECT',
    `Service: ${submission.serviceTitle}`,
    `Tile Style Preferences: ${tileList}`,
    `Project Size: ${submission.projectSize}`,
    `Timeline: ${submission.timeline}`,
    '',
    'Additional Notes:',
    submission.additionalNotes || 'None',
    '',
    `Submitted: ${submittedAt}`,
  ].join('\n');

  const html = `
    <h2>New Quote Wizard Submission</h2>
    <p>A customer completed the project quote wizard on the Portillo Ceramic and Tile website.</p>
    <h3 style="margin-top: 24px;">Contact Information</h3>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Name</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.name)}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Email</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;"><a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a></td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Phone</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.phone)}</td></tr>
    </table>
    <h3 style="margin-top: 24px;">Property</h3>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Type</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.propertyType)}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Location</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.location)}</td></tr>
    </table>
    <p style="margin-top: 12px; white-space: pre-wrap; line-height: 1.6;"><strong>Description:</strong><br>${escapeHtml(submission.propertyDescription)}</p>
    <h3 style="margin-top: 24px;">Project Details</h3>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Service</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.serviceTitle)}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Tile Preferences</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(tileList)}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Project Size</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.projectSize)}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Timeline</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.timeline)}</td></tr>
    </table>
    <h3 style="margin-top: 24px;">Additional Notes</h3>
    <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(submission.additionalNotes || 'None')}</p>
    <p style="color: #5a6a7a; font-size: 14px; margin-top: 24px;">Submitted: ${escapeHtml(submittedAt)}</p>
  `;

  return { text, html };
}

export async function sendWizardEmail(submission: WizardSubmission): Promise<void> {
  const mailer = getTransporter();
  const { text, html } = buildWizardEmailContent(submission);

  await mailer.sendMail({
    from: `"Portillo Ceramic and Tile Website" <${CONTACT_EMAIL_FROM}>`,
    to: CONTACT_EMAIL_TO,
    replyTo: `"${submission.name}" <${submission.email}>`,
    subject: `Wizard Quote: ${submission.serviceTitle} – ${submission.name}`,
    text,
    html,
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(SMTP_USER && SMTP_PASS);
}
