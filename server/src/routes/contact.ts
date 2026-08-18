import { Router, Request, Response } from 'express';
import { ContactFormData, ContactResponse, ApiError } from '../types';
import { isEmailConfigured, sendContactEmail } from '../services/email';

const router = Router();

function validateContactForm(data: Partial<ContactFormData>): string[] {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  }
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  }
  if (!data.projectType?.trim()) {
    errors.push('Project type is required');
  }
  if (!data.message?.trim()) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return errors;
}

router.post('/contact', async (req: Request, res: Response<ContactResponse | ApiError>) => {
  const formData: Partial<ContactFormData> = req.body;
  const errors = validateContactForm(formData);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  const submission: ContactFormData = {
    name: formData.name!.trim(),
    email: formData.email!.trim(),
    phone: formData.phone!.trim(),
    projectType: formData.projectType!.trim(),
    message: formData.message!.trim(),
    smsOptIn: Boolean(formData.smsOptIn),
    preferredVisit: formData.preferredVisit?.trim(),
    photos: Array.isArray(formData.photos) ? formData.photos : undefined,
  };

  if (!isEmailConfigured()) {
    console.error('Contact form submitted but email is not configured.');
    return res.status(503).json({
      success: false,
      message: 'Email service is not configured. Please call 703-867-0742 to reach us directly.',
    });
  }

  try {
    await sendContactEmail(submission);

    return res.status(200).json({
      success: true,
      message:
        'Thank you for your inquiry! Abel Portillo will contact you soon to discuss your project.',
    });
  } catch (error) {
    console.error('Failed to send contact email:', error);

    return res.status(500).json({
      success: false,
      message:
        'We could not send your request at this time. Please try again or call 703-867-0742.',
    });
  }
});

export default router;
