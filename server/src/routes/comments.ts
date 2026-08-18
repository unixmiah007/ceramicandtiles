import { Router, Request, Response } from 'express';
import { ApiError } from '../types';
import {
  addComment,
  getCommentsForSlug,
  getRecaptchaSiteKey,
  isRecaptchaConfigured,
  validateCommentInput,
  verifyRecaptcha,
} from '../services/comments';
import { BlogCommentInput, BlogCommentSubmitResponse, BlogCommentsResponse } from '../types/blog';

const router = Router();

router.get('/blog/:slug/comments', async (req: Request, res: Response<BlogCommentsResponse | ApiError>) => {
  try {
    const slug = String(req.params.slug);
    const comments = await getCommentsForSlug(slug);

    return res.json({
      success: true,
      comments,
      recaptchaSiteKey: getRecaptchaSiteKey(),
    });
  } catch (error) {
    console.error('Failed to load blog comments:', error);
    return res.status(500).json({
      success: false,
      message: 'Could not load comments.',
    });
  }
});

router.post(
  '/blog/:slug/comments',
  async (req: Request, res: Response<BlogCommentSubmitResponse | ApiError>) => {
    const slug = String(req.params.slug);
    const input: Partial<BlogCommentInput> = req.body;
    const errors = validateCommentInput(input);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    if (!isRecaptchaConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'Comment submission is not configured. Please contact the site owner.',
      });
    }

    const recaptchaValid = await verifyRecaptcha(input.recaptchaToken!.trim());
    if (!recaptchaValid) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed. Please try again.',
      });
    }

    try {
      const comment = await addComment(slug, {
        name: input.name!.trim(),
        email: input.email!.trim(),
        body: input.body!.trim(),
        recaptchaToken: input.recaptchaToken!.trim(),
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your comment has been posted.',
        comment,
      });
    } catch (error) {
      console.error('Failed to save blog comment:', error);
      return res.status(500).json({
        success: false,
        message: 'Could not save your comment. Please try again.',
      });
    }
  }
);

export default router;
