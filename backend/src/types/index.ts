import { Request } from 'express';

export interface UserPayload {
  userId: string;
  email: string;
  role: 'admin' | 'superadmin';
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

// Common types
export type DocumentStatus = 'draft' | 'published' | 'archived';
export type LanguageCode = 'en' | 'mr';
