import { Router, Request, Response } from 'express';
import { ApiError, ContactResponse, EstimateSubmission } from '../types/index.js';
import { isEmailConfigured, sendEstimateEmail } from '../services/email.js';

const router = Router();

function validateEstimateSubmission(data: Partial<EstimateSubmission>): string[] {
  const errors: string[] = [];

  if (!data.name?.trim()) errors.push('Name is required');
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  if (!data.phone?.trim()) errors.push('Phone number is required');
  if (!data.propertyType?.trim()) errors.push('Property type is required');
  if (!data.projectType?.trim()) errors.push('Project type is required');
  if (!data.size?.trim()) errors.push('Project size is required');
  if (!data.timeline?.trim()) errors.push('Timeline is required');
  if (!data.tileMaterial?.trim()) errors.push('Tile material is required');
  if (typeof data.minCost !== 'number' || typeof data.maxCost !== 'number') {
    errors.push('Cost estimate is required');
  }
  if (typeof data.weeksMin !== 'number' || typeof data.weeksMax !== 'number') {
    errors.push('Timeline estimate is required');
  }

  return errors;
}

router.post('/estimate', async (req: Request, res: Response<ContactResponse | ApiError>) => {
  const formData: Partial<EstimateSubmission> = req.body;
  const errors = validateEstimateSubmission(formData);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  const submission: EstimateSubmission = {
    name: formData.name!.trim(),
    email: formData.email!.trim(),
    phone: formData.phone!.trim(),
    message: formData.message?.trim() ?? '',
    propertyType: formData.propertyType!.trim(),
    projectType: formData.projectType!.trim(),
    size: formData.size!.trim(),
    timeline: formData.timeline!.trim(),
    tileMaterial: formData.tileMaterial!.trim(),
    addons: Array.isArray(formData.addons)
      ? formData.addons.map((item) => String(item).trim()).filter(Boolean)
      : [],
    minCost: formData.minCost!,
    maxCost: formData.maxCost!,
    weeksMin: formData.weeksMin!,
    weeksMax: formData.weeksMax!,
  };

  if (!isEmailConfigured()) {
    return res.status(503).json({
      success: false,
      message: 'Email service is not configured. Please call 703-867-0742 to reach us directly.',
    });
  }

  try {
    await sendEstimateEmail(submission);

    return res.status(200).json({
      success: true,
      message:
        'Thank you! Your estimate has been emailed to you and our team. Abel Portillo will contact you soon.',
    });
  } catch (error) {
    console.error('Failed to send estimate email:', error);

    return res.status(500).json({
      success: false,
      message:
        'We could not send your estimate at this time. Please try again or call 703-867-0742.',
    });
  }
});

export default router;
