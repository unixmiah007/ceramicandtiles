export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
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
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
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

export interface ContentSection {
  heading: string;
  body: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tagline: string;
  intro: string;
  sections: ContentSection[];
  highlights: string[];
  idealFor: string[];
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
  tagline: string;
  intro: string;
  sections: ContentSection[];
  highlights: string[];
}

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}
