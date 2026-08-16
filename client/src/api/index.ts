import { ContactFormData, ContactResponse, ApiError } from '../types';

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

export { services, projects, valuePropositions, contactInfo } from '../data/content';
