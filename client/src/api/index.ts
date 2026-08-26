import { ContactFormData, ContactResponse, ApiError, ChatMessage, ChatResponse, ChatStatusResponse, WizardSubmission, EstimateSubmission, BlogCommentsResponse, BlogCommentInput, BlogCommentSubmitResponse } from '../types';

const API_BASE = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    throw data as ApiError;
  }
  return data as T;
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return handleResponse<ContactResponse>(response);
}

export async function fetchChatStatus(): Promise<ChatStatusResponse> {
  const response = await fetch(`${API_BASE}/chat/status`);
  return handleResponse<ChatStatusResponse>(response);
}

export async function sendChatMessage(messages: Pick<ChatMessage, 'role' | 'content'>[]): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  return handleResponse<ChatResponse>(response);
}

export async function submitWizardForm(formData: WizardSubmission): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE}/wizard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return handleResponse<ContactResponse>(response);
}

export async function submitEstimateForm(formData: EstimateSubmission): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE}/estimate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return handleResponse<ContactResponse>(response);
}

export async function fetchBlogComments(slug: string): Promise<BlogCommentsResponse> {
  const response = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}/comments`);
  return handleResponse<BlogCommentsResponse>(response);
}

export async function submitBlogComment(slug: string, data: BlogCommentInput): Promise<BlogCommentSubmitResponse> {
  const response = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<BlogCommentSubmitResponse>(response);
}

export { services, projects, contactInfo } from '../data/content';
export { getServiceById } from '../data/services';
export { valuePropositions, getValueById } from '../data/values';
