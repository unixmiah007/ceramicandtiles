export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export interface WizardSubmission {
  propertyType: string;
  propertyDescription: string;
  location: string;
  serviceTitle: string;
  tileSamples: string[];
  projectSize: string;
  timeline: string;
  additionalNotes: string;
  name: string;
  email: string;
  phone: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
}

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  success: boolean;
  reply: string;
  mode: 'ai' | 'local';
}

export interface ChatStatusResponse {
  available: boolean;
  mode: 'ai' | 'local';
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
}

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
}
