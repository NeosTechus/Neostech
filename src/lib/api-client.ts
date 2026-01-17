// API Client for connecting to Vercel serverless functions
// Uses relative path - works both locally and in production
const API_BASE_URL = '/api';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken() {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: 'Network error. Please try again.' };
    }
  }

  // Auth endpoints
  async register(email: string, password: string, name?: string) {
    return this.request<{ token: string; user: { id: string; email: string; name?: string } }>(
      '/auth',
      {
        method: 'POST',
        body: JSON.stringify({ action: 'register', email, password, name }),
      }
    );
  }

  async login(email: string, password: string) {
    const result = await this.request<{ token: string; user: { id: string; email: string; name?: string } }>(
      '/auth',
      {
        method: 'POST',
        body: JSON.stringify({ action: 'login', email, password }),
      }
    );
    
    if (result.data?.token) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  async guestSession() {
    const result = await this.request<{ token: string; user: { id: string; isGuest: boolean } }>(
      '/auth',
      {
        method: 'POST',
        body: JSON.stringify({ action: 'guest' }),
      }
    );
    
    if (result.data?.token) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  async getProfile() {
    return this.request<{ id: string; email: string; name?: string }>('/auth');
  }

  logout() {
    this.setToken(null);
  }

  // Orders endpoints
  async getOrders() {
    return this.request<Array<{
      id: string;
      status: string;
      items: Array<{ name: string; quantity: number; price: number }>;
      total: number;
      createdAt: string;
    }>>('/orders');
  }

  async getOrder(orderId: string) {
    return this.request<{
      id: string;
      status: string;
      items: Array<{ name: string; quantity: number; price: number }>;
      total: number;
      createdAt: string;
    }>(`/orders?id=${orderId}`);
  }

  async createOrder(items: Array<{ name: string; quantity: number; price: number }>) {
    return this.request<{ id: string; status: string; total: number }>(
      '/orders',
      {
        method: 'POST',
        body: JSON.stringify({ items }),
      }
    );
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.request<{ id: string; status: string }>(
      '/orders',
      {
        method: 'PUT',
        body: JSON.stringify({ id: orderId, status }),
      }
    );
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
