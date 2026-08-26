import { Router, Request, Response } from 'express';
import { ApiError } from '../types';
import { addComment, getCommentsForSlug, validateCommentInput } from '../services/comments';
import { BlogCommentInput, BlogCommentSubmitResponse, BlogCommentsResponse } from '../types/blog';

const router = Router();

router.get('/blog/:slug/comments', async (req: Request, res: Response<BlogCommentsResponse | ApiError>) => {
  try {
    const slug = String(req.params.slug);
    const comments = await getCommentsForSlug(slug);

    return res.json({
      success: true,
      comments,
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

    try {
      const comment = await addComment(slug, {
        name: input.name!.trim(),
        email: input.email!.trim(),
        body: input.body!.trim(),
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
