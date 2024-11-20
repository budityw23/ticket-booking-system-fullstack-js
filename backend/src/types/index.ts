export interface ErrorResponse {
  error: string;
  message?: string;
  stack?: string;
}

export interface HealthCheck {
  status: string;
  timestamp: Date;
  uptime?: number;
  database?: string;
  message?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
}

// Paginated Response Interface
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// API Response Interface
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

// User Interface
export interface User {
  _id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Request with User Interface (for authenticated routes)
export interface RequestWithUser extends Request {
  user?: User;
}
