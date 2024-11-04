import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API wrapper functions
export const apiService = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  // Dashboard
  getDashboardStats: () => api.get('/admin/stats'),

  // Users
  getUsers: () => api.get('/admin/users'),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),

  // Events
  getEvents: () => api.get('/admin/events'),
  createEvent: (data: any) => api.post('/admin/events', data),
  updateEvent: (id: string, data: any) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id: string) => api.delete(`/admin/events/${id}`),

  // Bookings
  getBookings: () => api.get('/admin/bookings'),
  updateBooking: (id: string, data: any) => api.put(`/admin/bookings/${id}`, data),
  deleteBooking: (id: string) => api.delete(`/admin/bookings/${id}`)
};

export default apiService;