import { Router, Request, Response } from 'express';
import { ApiError, ContactResponse, WizardSubmission } from '../types/index.js';
import { isEmailConfigured, sendWizardEmail } from '../services/email.js';
import { notifyFormSms } from '../services/sms.js';

const router = Router();

function validateWizardSubmission(data: Partial<WizardSubmission>): string[] {
  const errors: string[] = [];

  if (!data.propertyType?.trim()) errors.push('Property type is required');
  if (!data.propertyDescription?.trim()) errors.push('Property description is required');
  if (data.propertyDescription && data.propertyDescription.trim().length < 10) {
    errors.push('Property description must be at least 10 characters');
  }
  if (!data.location?.trim()) errors.push('Location is required');
  if (!data.serviceTitle?.trim()) errors.push('Service is required');
  if (!data.projectSize?.trim()) errors.push('Project size is required');
  if (!data.timeline?.trim()) errors.push('Timeline is required');
  if (!data.name?.trim()) errors.push('Name is required');
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  if (!data.phone?.trim()) errors.push('Phone number is required');

  return errors;
}

router.post('/wizard', async (req: Request, res: Response<ContactResponse | ApiError>) => {
  const formData: Partial<WizardSubmission> = req.body;
  const errors = validateWizardSubmission(formData);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  const submission: WizardSubmission = {
    propertyType: formData.propertyType!.trim(),
    propertyDescription: formData.propertyDescription!.trim(),
    location: formData.location!.trim(),
    serviceTitle: formData.serviceTitle!.trim(),
    tileSamples: Array.isArray(formData.tileSamples)
      ? formData.tileSamples.map((item) => String(item).trim()).filter(Boolean)
      : [],
    projectSize: formData.projectSize!.trim(),
    timeline: formData.timeline!.trim(),
    additionalNotes: formData.additionalNotes?.trim() ?? '',
    name: formData.name!.trim(),
    email: formData.email!.trim(),
    phone: formData.phone!.trim(),
    smsOptIn: Boolean(formData.smsOptIn),
    preferredVisit: formData.preferredVisit?.trim(),
    photos: Array.isArray(formData.photos) ? formData.photos : undefined,
  };

  if (!isEmailConfigured()) {
    return res.status(503).json({
      success: false,
      message: 'Email service is not configured. Please call 703-867-0742 to reach us directly.',
    });
  }

  try {
    await sendWizardEmail(submission);
    notifyFormSms({
      form: 'Quote Wizard',
      name: submission.name,
      phone: submission.phone,
      summary: `${submission.serviceTitle} in ${submission.location}`,
    });

    return res.status(200).json({
      success: true,
      message:
        'Thank you! Your project details have been sent. Abel Portillo will contact you soon to discuss your quote.',
    });
  } catch (error) {
    console.error('Failed to send wizard email:', error);

    return res.status(500).json({
      success: false,
      message:
        'We could not send your request at this time. Please try again or call 703-867-0742.',
    });
  }
});

export default router;
