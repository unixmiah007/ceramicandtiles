import { Router, Request, Response } from 'express';
import { generateChatResponse, getChatMode } from '../services/chatAgent';
import { ApiError, ChatRequest, ChatResponse } from '../types';

const router = Router();
const rateLimitMap = new Map<string, number[]>();
const MAX_MESSAGES_PER_MINUTE = 30;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 20;

function getClientId(req: Request): string {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const windowStart = now - 60_000;
  const timestamps = (rateLimitMap.get(clientId) || []).filter((time) => time > windowStart);

  if (timestamps.length >= MAX_MESSAGES_PER_MINUTE) {
    rateLimitMap.set(clientId, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(clientId, timestamps);
  return false;
}

function validateChatRequest(body: Partial<ChatRequest>): string[] {
  const errors: string[] = [];

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    errors.push('At least one message is required');
    return errors;
  }

  if (body.messages.length > MAX_HISTORY_LENGTH) {
    errors.push(`Message history cannot exceed ${MAX_HISTORY_LENGTH} messages`);
  }

  for (const message of body.messages) {
    if (message.role !== 'user' && message.role !== 'assistant') {
      errors.push('Each message must have role "user" or "assistant"');
    }
    if (!message.content?.trim()) {
      errors.push('Each message must include content');
    } else if (message.content.trim().length > MAX_MESSAGE_LENGTH) {
      errors.push(`Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer`);
    }
  }

  const lastMessage = body.messages[body.messages.length - 1];
  if (lastMessage?.role !== 'user') {
    errors.push('The latest message must be from the user');
  }

  return errors;
}

router.get('/chat/status', (_req: Request, res: Response) => {
  res.json({
    available: true,
    mode: getChatMode(),
  });
});

router.post('/chat', async (req: Request, res: Response<ChatResponse | ApiError>) => {
  const clientId = getClientId(req);

  if (isRateLimited(clientId)) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages. Please wait a moment and try again.',
    });
  }

  const errors = validateChatRequest(req.body);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  const { messages } = req.body as ChatRequest;
  const sanitizedMessages = messages.map((message) => ({
    role: message.role,
    content: message.content.trim(),
  }));

  try {
    const { reply, mode } = await generateChatResponse(sanitizedMessages);

    return res.status(200).json({
      success: true,
      reply,
      mode,
    });
  } catch (error) {
    console.error('Chat request failed:', error);

    return res.status(500).json({
      success: false,
      message: 'The assistant is temporarily unavailable. Please call 703-867-0742.',
    });
  }
});

export default router;
