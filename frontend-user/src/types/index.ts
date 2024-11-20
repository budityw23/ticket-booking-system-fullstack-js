export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  }
  
  export interface Ticket {
    id: string;
    name: string;
    description: string;
    price: number;
    availableQuota: number;
  }
  