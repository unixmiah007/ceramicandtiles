import '../loadEnv';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { ContactFormData, PhotoAttachment, WizardSubmission } from '../types';

const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'PortilloCeramicTile@gmail.com';
const CONTACT_EMAIL_CC =
  process.env.CONTACT_EMAIL_CC || 'shaj.k.miah@gmail.com,anthonyportillo1515@gmail.com';
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

function getFormEmailRecipients(): { to: string; cc?: string } {
  const to = CONTACT_EMAIL_TO.toLowerCase();
  const ccAddresses = CONTACT_EMAIL_CC.split(',')
    .map((address) => address.trim())
    .filter((address) => address && address.toLowerCase() !== to);

  return {
    to: CONTACT_EMAIL_TO,
    cc: ccAddresses.length ? ccAddresses.join(', ') : undefined,
  };
}

function buildAttachments(photos?: PhotoAttachment[]) {
  if (!photos?.length) return undefined;

  return photos.map((photo) => ({
    filename: photo.name,
    content: Buffer.from(photo.data, 'base64'),
    contentType: photo.type,
  }));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatSubmittedAt(): string {
  return new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });
}

const EMAIL_TABLE_STYLE = 'border-collapse: collapse; width: 100%; max-width: 600px;';
const EMAIL_CELL_LABEL =
  'padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4; vertical-align: top;';
const EMAIL_CELL_VALUE = 'padding: 8px 12px; border-bottom: 1px solid #e0dcd4;';

function buildCustomerEmailWrapper(introHtml: string, detailsHtml: string, submittedAt: string) {
  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #1a2a3a; line-height: 1.6; max-width: 640px;">
      <h2 style="margin: 0 0 16px; font-size: 24px;">Portillo Ceramic and Tile</h2>
      ${introHtml}
      <h3 style="margin: 28px 0 12px; font-size: 18px;">Your submission details</h3>
      ${detailsHtml}
      <p style="color: #5a6a7a; font-size: 14px; margin-top: 24px;">Submitted: ${escapeHtml(submittedAt)}</p>
      <p style="margin-top: 24px; font-size: 14px; color: #5a6a7a;">
        Questions? Call <a href="tel:7038670742" style="color: #1a2a3a;">703-867-0742</a>
        or email <a href="mailto:PortilloCeramicTile@gmail.com" style="color: #1a2a3a;">PortilloCeramicTile@gmail.com</a>.
      </p>
    </div>
  `;

  return html;
}

function buildContactConfirmationContent(submission: ContactFormData) {
  const submittedAt = formatSubmittedAt();

  const text = [
    `Hi ${submission.name},`,
    '',
    'Thank you for contacting Portillo Ceramic and Tile. We received your quote request and someone from our team will contact you soon.',
    '',
    'Here is a copy of what you submitted on our website:',
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    `Project Type: ${submission.projectType}`,
    submission.preferredVisit ? `Preferred Visit: ${submission.preferredVisit}` : '',
    submission.smsOptIn ? 'SMS Updates: Yes' : 'SMS Updates: No',
    submission.photos?.length ? `Photos Uploaded: ${submission.photos.length}` : '',
    '',
    'Project Details:',
    submission.message,
    '',
    `Submitted: ${submittedAt}`,
    '',
    'Questions? Call 703-867-0742 or email PortilloCeramicTile@gmail.com.',
  ]
    .filter(Boolean)
    .join('\n');

  const detailsHtml = `
    <table style="${EMAIL_TABLE_STYLE}">
      <tr><td style="${EMAIL_CELL_LABEL}">Name</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.name)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Email</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.email)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Phone</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.phone)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Project Type</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.projectType)}</td></tr>
      ${submission.preferredVisit ? `<tr><td style="${EMAIL_CELL_LABEL}">Preferred Visit</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.preferredVisit)}</td></tr>` : ''}
      <tr><td style="${EMAIL_CELL_LABEL}">SMS Updates</td><td style="${EMAIL_CELL_VALUE}">${submission.smsOptIn ? 'Yes' : 'No'}</td></tr>
      ${submission.photos?.length ? `<tr><td style="${EMAIL_CELL_LABEL}">Photos</td><td style="${EMAIL_CELL_VALUE}">${submission.photos.length} uploaded with your request</td></tr>` : ''}
    </table>
    <h3 style="margin-top: 24px; font-size: 16px;">Project Details</h3>
    <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${escapeHtml(submission.message)}</p>
  `;

  const introHtml = `
    <p style="margin: 0 0 12px;">Hi ${escapeHtml(submission.name)},</p>
    <p style="margin: 0 0 12px;">
      Thank you for contacting Portillo Ceramic and Tile. We received your quote request and
      <strong>someone from our team will contact you soon</strong> to discuss your project.
    </p>
    <p style="margin: 0;">Below is a copy of the details you submitted on our website.</p>
  `;

  const html = buildCustomerEmailWrapper(introHtml, detailsHtml, submittedAt);

  return { text, html };
}

function buildWizardConfirmationContent(submission: WizardSubmission) {
  const submittedAt = formatSubmittedAt();
  const tileList = submission.tileSamples.length
    ? submission.tileSamples.join(', ')
    : 'None selected';

  const text = [
    `Hi ${submission.name},`,
    '',
    'Thank you for completing the Portillo Ceramic and Tile quote wizard. We received your project details and someone from our team will contact you soon.',
    '',
    'Here is a copy of what you submitted on our website:',
    '',
    'CONTACT',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    submission.preferredVisit ? `Preferred Visit: ${submission.preferredVisit}` : '',
    submission.smsOptIn ? 'SMS Updates: Yes' : 'SMS Updates: No',
    submission.photos?.length ? `Photos Uploaded: ${submission.photos.length}` : '',
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
    '',
    'Questions? Call 703-867-0742 or email PortilloCeramicTile@gmail.com.',
  ]
    .filter(Boolean)
    .join('\n');

  const detailsHtml = `
    <h4 style="margin: 0 0 8px; font-size: 15px;">Contact Information</h4>
    <table style="${EMAIL_TABLE_STYLE}">
      <tr><td style="${EMAIL_CELL_LABEL}">Name</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.name)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Email</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.email)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Phone</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.phone)}</td></tr>
      ${submission.preferredVisit ? `<tr><td style="${EMAIL_CELL_LABEL}">Preferred Visit</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.preferredVisit)}</td></tr>` : ''}
      <tr><td style="${EMAIL_CELL_LABEL}">SMS Updates</td><td style="${EMAIL_CELL_VALUE}">${submission.smsOptIn ? 'Yes' : 'No'}</td></tr>
      ${submission.photos?.length ? `<tr><td style="${EMAIL_CELL_LABEL}">Photos</td><td style="${EMAIL_CELL_VALUE}">${submission.photos.length} uploaded with your request</td></tr>` : ''}
    </table>
    <h4 style="margin: 24px 0 8px; font-size: 15px;">Property</h4>
    <table style="${EMAIL_TABLE_STYLE}">
      <tr><td style="${EMAIL_CELL_LABEL}">Type</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.propertyType)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Location</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.location)}</td></tr>
    </table>
    <p style="margin-top: 12px; white-space: pre-wrap; line-height: 1.6;"><strong>Description:</strong><br>${escapeHtml(submission.propertyDescription)}</p>
    <h4 style="margin: 24px 0 8px; font-size: 15px;">Project Details</h4>
    <table style="${EMAIL_TABLE_STYLE}">
      <tr><td style="${EMAIL_CELL_LABEL}">Service</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.serviceTitle)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Tile Preferences</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(tileList)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Project Size</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.projectSize)}</td></tr>
      <tr><td style="${EMAIL_CELL_LABEL}">Timeline</td><td style="${EMAIL_CELL_VALUE}">${escapeHtml(submission.timeline)}</td></tr>
    </table>
    <h4 style="margin: 24px 0 8px; font-size: 15px;">Additional Notes</h4>
    <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${escapeHtml(submission.additionalNotes || 'None')}</p>
  `;

  const introHtml = `
    <p style="margin: 0 0 12px;">Hi ${escapeHtml(submission.name)},</p>
    <p style="margin: 0 0 12px;">
      Thank you for completing our project quote wizard. We received your details and
      <strong>someone from our team will contact you soon</strong> to discuss your quote.
    </p>
    <p style="margin: 0;">Below is a copy of the information you submitted on our website.</p>
  `;

  const html = buildCustomerEmailWrapper(introHtml, detailsHtml, submittedAt);

  return { text, html };
}

async function sendCustomerConfirmationEmail(options: {
  to: string;
  name: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const mailer = getTransporter();

  await mailer.sendMail({
    from: `"Portillo Ceramic and Tile" <${CONTACT_EMAIL_FROM}>`,
    to: options.to,
    replyTo: `"Portillo Ceramic and Tile" <${CONTACT_EMAIL_TO}>`,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

function buildEmailContent(submission: ContactFormData) {
  const submittedAt = formatSubmittedAt();

  const text = [
    'New quote request from the Portillo Ceramic and Tile website',
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    `Project Type: ${submission.projectType}`,
    submission.preferredVisit ? `Preferred Visit: ${submission.preferredVisit}` : '',
    submission.smsOptIn ? 'SMS Updates: Yes' : 'SMS Updates: No',
    submission.photos?.length ? `Photos Attached: ${submission.photos.length}` : '',
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
      ${submission.preferredVisit ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Preferred Visit</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.preferredVisit)}</td></tr>` : ''}
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">SMS Updates</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${submission.smsOptIn ? 'Yes' : 'No'}</td></tr>
      ${submission.photos?.length ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Photos</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${submission.photos.length} attached</td></tr>` : ''}
    </table>
    <h3 style="margin-top: 24px;">Project Details</h3>
    <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(submission.message)}</p>
    <p style="color: #5a6a7a; font-size: 14px; margin-top: 24px;">Submitted: ${escapeHtml(submittedAt)}</p>
  `;

  return { text, html };
}

export async function sendContactEmail(submission: ContactFormData): Promise<void> {
  const mailer = getTransporter();
  const { text, html } = buildEmailContent(submission);
  const { to, cc } = getFormEmailRecipients();

  await mailer.sendMail({
    from: `"Portillo Ceramic and Tile Website" <${CONTACT_EMAIL_FROM}>`,
    to,
    cc,
    replyTo: `"${submission.name}" <${submission.email}>`,
    subject: `Quote Request: ${submission.projectType} – ${submission.name}`,
    text,
    html,
    attachments: buildAttachments(submission.photos),
  });

  const confirmation = buildContactConfirmationContent(submission);
  try {
    await sendCustomerConfirmationEmail({
      to: submission.email,
      name: submission.name,
      subject: 'We received your quote request – Portillo Ceramic and Tile',
      text: confirmation.text,
      html: confirmation.html,
    });
  } catch (error) {
    console.error('Failed to send contact confirmation email to customer:', error);
  }
}

function buildWizardEmailContent(submission: WizardSubmission) {
  const submittedAt = formatSubmittedAt();

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
    submission.preferredVisit ? `Preferred Visit: ${submission.preferredVisit}` : '',
    submission.smsOptIn ? 'SMS Updates: Yes' : 'SMS Updates: No',
    submission.photos?.length ? `Photos Attached: ${submission.photos.length}` : '',
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
      ${submission.preferredVisit ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Preferred Visit</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${escapeHtml(submission.preferredVisit)}</td></tr>` : ''}
      <tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">SMS Updates</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${submission.smsOptIn ? 'Yes' : 'No'}</td></tr>
      ${submission.photos?.length ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e0dcd4;">Photos</td><td style="padding: 8px 12px; border-bottom: 1px solid #e0dcd4;">${submission.photos.length} attached</td></tr>` : ''}
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
  const { to, cc } = getFormEmailRecipients();

  await mailer.sendMail({
    from: `"Portillo Ceramic and Tile Website" <${CONTACT_EMAIL_FROM}>`,
    to,
    cc,
    replyTo: `"${submission.name}" <${submission.email}>`,
    subject: `Wizard Quote: ${submission.serviceTitle} – ${submission.name}`,
    text,
    html,
    attachments: buildAttachments(submission.photos),
  });

  const confirmation = buildWizardConfirmationContent(submission);
  try {
    await sendCustomerConfirmationEmail({
      to: submission.email,
      name: submission.name,
      subject: 'We received your project details – Portillo Ceramic and Tile',
      text: confirmation.text,
      html: confirmation.html,
    });
  } catch (error) {
    console.error('Failed to send wizard confirmation email to customer:', error);
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(SMTP_USER && SMTP_PASS);
}
