import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { BlogComment, BlogCommentInput } from '../types/blog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../data');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');

type CommentsStore = Record<string, BlogComment[]>;

async function ensureStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(COMMENTS_FILE);
  } catch {
    await fs.writeFile(COMMENTS_FILE, JSON.stringify({}, null, 2), 'utf-8');
  }
}

async function readStore(): Promise<CommentsStore> {
  await ensureStore();
  const raw = await fs.readFile(COMMENTS_FILE, 'utf-8');
  return JSON.parse(raw) as CommentsStore;
}

async function writeStore(store: CommentsStore): Promise<void> {
  await ensureStore();
  await fs.writeFile(COMMENTS_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

export async function getCommentsForSlug(slug: string): Promise<BlogComment[]> {
  const store = await readStore();
  return (store[slug] ?? []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function validateCommentInput(input: Partial<BlogCommentInput>): string[] {
  const errors: string[] = [];

  if (!input.name?.trim()) {
    errors.push('Name is required');
  } else if (input.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!input.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.push('Please provide a valid email address');
  }

  if (!input.body?.trim()) {
    errors.push('Comment is required');
  } else if (input.body.trim().length < 10) {
    errors.push('Comment must be at least 10 characters');
  } else if (input.body.trim().length > 2000) {
    errors.push('Comment must be 2000 characters or less');
  }

  return errors;
}

export async function addComment(slug: string, input: BlogCommentInput): Promise<BlogComment> {
  const store = await readStore();
  const comment: BlogComment = {
    id: randomUUID(),
    slug,
    name: input.name.trim(),
    body: input.body.trim(),
    createdAt: new Date().toISOString(),
  };

  const existing = store[slug] ?? [];
  store[slug] = [comment, ...existing];
  await writeStore(store);

  return comment;
}

export async function getCommentCounts(): Promise<Record<string, number>> {
  const store = await readStore();
  return Object.fromEntries(
    Object.entries(store).map(([slug, comments]) => [slug, comments.length])
  );
}
