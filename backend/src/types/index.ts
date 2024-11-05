export interface ErrorResponse {
    error: string;
    message?: string;
  }
  
  export interface HealthCheck {
    status: string;
    timestamp: Date;
  }
  