// ==============================
// Common Type Aliases
// ==============================

export type { SubjectId } from "./constants";

// ==============================
// Common Primitive Types
// ==============================

export type ID = string;
export type ISODate = string;
export type URLString = string;

// ==============================
// Generic Utility Types
// ==============================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// ==============================
// API Response
// ==============================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ==============================
// Pagination
// ==============================

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}