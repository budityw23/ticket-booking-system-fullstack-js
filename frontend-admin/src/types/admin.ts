// Base user interface that can be extended
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Admin user with role and permissions
export interface AdminUser extends User {
  role: 'admin' | 'manager';
  permissions: string[];
  lastLogin?: string;
  status: 'active' | 'inactive';
}

// Ticket manager interface
export interface TicketManager {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  managedEvents: string[];
  phone?: string;
}

// Dashboard statistics
export interface DashboardStats {
  totalTickets: number;
  totalBookings: number;
  totalRevenue: number;
  activeEvents: number;
  revenueByPeriod: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  topSellingEvents: Array<{
    id: string;
    name: string;
    soldCount: number;
    revenue: number;
  }>;
  recentBookings: Array<{
    id: string;
    eventName: string;
    customerName: string;
    amount: number;
    status: BookingStatus;
    date: string;
  }>;
}

// Ticket statistics
export interface TicketStats {
  ticketId: string;
  ticketName: string;
  soldCount: number;
  revenue: number;
  availableQuota: number;
  eventDate: string;
  category: string;
  pricePerTicket: number;
  salesTrend: {
    lastDay: number;
    lastWeek: number;
    lastMonth: number;
  };
}

// Event interface
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  status: EventStatus;
  ticketTypes: TicketType[];
  createdAt: string;
  updatedAt: string;
  managedBy: string;
}

// Ticket type interface
export interface TicketType {
  id: string;
  name: string;
  price: number;
  quota: number;
  available: number;
  description?: string;
}

// Booking interface
export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  ticketTypeId: string;
  quantity: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

// Enums for status types
export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter and Sort types
export interface FilterOptions {
  startDate?: string;
  endDate?: string;
  status?: string;
  category?: string;
  search?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}
