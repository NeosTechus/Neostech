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

  // Admin endpoints
  async adminLogin(email: string, password: string) {
    const result = await this.request<{ 
      token: string; 
      user: { id: string; email: string; name?: string };
      isAdmin: boolean;
    }>(
      '/auth',
      {
        method: 'POST',
        body: JSON.stringify({ action: 'admin-login', email, password }),
      }
    );
    
    if (result.data?.token) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  async getAdminStats() {
    return this.request<{
      totalOrders: number;
      totalRevenue: number;
      totalCustomers: number;
      pendingOrders: number;
      completedOrders: number;
      cancelledOrders: number;
    }>('/admin?action=stats');
  }

  async getAdminOrders() {
    return this.request<Array<{
      id: string;
      status: string;
      items: Array<{ name: string; quantity: number; price: number }>;
      total: number;
      customerEmail?: string;
      createdAt: string;
    }>>('/admin?action=orders');
  }

  async updateAdminOrderStatus(orderId: string, status: string) {
    return this.request<{ id: string; status: string }>(
      '/admin?action=orders',
      {
        method: 'PUT',
        body: JSON.stringify({ orderId, status }),
      }
    );
  }

  async getAdminCustomers() {
    return this.request<Array<{
      id: string;
      email: string;
      name?: string;
      isGuest: boolean;
      totalOrders: number;
      totalSpent: number;
      createdAt: string;
    }>>('/admin?action=customers');
  }

  // Employee endpoints
  async employeeLogin(email: string, password: string) {
    const result = await this.request<{ 
      token: string; 
      user: { id: string; email: string; name?: string };
      isEmployee: boolean;
    }>(
      '/auth',
      {
        method: 'POST',
        body: JSON.stringify({ action: 'employee-login', email, password }),
      }
    );
    
    if (result.data?.token) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  async getEmployeeDashboard() {
    return this.request('/employee?action=dashboard');
  }

  async getEmployeeProfile() {
    return this.request('/employee?action=profile');
  }

  async updateEmployeeTicketStatus(ticketId: string, status: string) {
    return this.request<{ success: boolean; ticketId: string; status: string }>(
      '/employee?action=ticket-status',
      {
        method: 'PUT',
        body: JSON.stringify({ ticketId, status }),
      }
    );
  }

  // Admin Employee Management
  async getAdminEmployees() {
    return this.request('/admin-employees?action=list');
  }

  async createAdminEmployee(data: { email: string; password: string; name: string; position: string; department: string }) {
    return this.request('/admin-employees?action=employee', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAdminEmployee(employeeId: string, name: string, position: string, department: string) {
    return this.request('/admin-employees?action=update-employee', {
      method: 'PUT',
      body: JSON.stringify({ employeeId, name, position, department }),
    });
  }

  async deleteAdminEmployee(employeeId: string) {
    return this.request('/admin-employees?action=employee', {
      method: 'DELETE',
      body: JSON.stringify({ employeeId }),
    });
  }

  // Admin Projects Management
  async getAdminProjects() {
    return this.request('/admin-employees?action=projects');
  }

  async createAdminProject(data: { name: string; description: string; status: string; deadline?: string }) {
    return this.request('/admin-employees?action=project', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAdminProject(projectId: string, data: { name?: string; description?: string; status?: string; deadline?: string }) {
    return this.request('/admin-employees?action=update-project', {
      method: 'PUT',
      body: JSON.stringify({ projectId, ...data }),
    });
  }

  async deleteAdminProject(projectId: string) {
    return this.request('/admin-employees?action=project', {
      method: 'DELETE',
      body: JSON.stringify({ projectId }),
    });
  }

  async assignProjectEmployees(projectId: string, employeeIds: string[]) {
    return this.request('/admin-employees?action=assign-project', {
      method: 'PUT',
      body: JSON.stringify({ projectId, employeeIds }),
    });
  }

  // Admin Tickets Management
  async getAdminTickets() {
    return this.request('/admin-employees?action=tickets');
  }

  async createAdminTicket(data: { title: string; description: string; priority: string; status?: string; projectId?: string }) {
    return this.request('/admin-employees?action=ticket', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAdminTicket(ticketId: string, data: { title?: string; description?: string; priority?: string; status?: string }) {
    return this.request('/admin-employees?action=update-ticket', {
      method: 'PUT',
      body: JSON.stringify({ ticketId, ...data }),
    });
  }

  async deleteAdminTicket(ticketId: string) {
    return this.request('/admin-employees?action=ticket', {
      method: 'DELETE',
      body: JSON.stringify({ ticketId }),
    });
  }

  async assignTicketEmployee(ticketId: string, employeeId: string | null) {
    return this.request('/admin-employees?action=assign-ticket', {
      method: 'PUT',
      body: JSON.stringify({ ticketId, employeeId }),
    });
  }

  // Admin Payments (Stripe)
  async getPaymentStats() {
    return this.request<{
      totalRevenue: number;
      paymentLinksRevenue: number;
      invoicesRevenue: number;
      totalPaymentLinks: number;
      activePaymentLinks: number;
      paidPaymentLinks: number;
      totalInvoices: number;
      paidInvoices: number;
      pendingInvoices: number;
    }>('/admin-payments?action=stats');
  }

  async getPaymentLinks() {
    return this.request<Array<{
      id: string;
      stripeId: string;
      url: string;
      amount: number;
      description: string;
      customerEmail?: string;
      status: string;
      createdAt: string;
    }>>('/admin-payments?action=payment-links');
  }

  async createPaymentLink(data: { amount: number; description?: string; customerEmail?: string }) {
    return this.request<{ id: string; url: string; amount: number; description?: string }>(
      '/admin-payments?action=payment-link',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  async deactivatePaymentLink(linkId: string) {
    return this.request<{ success: boolean }>(
      `/admin-payments?action=payment-link&linkId=${linkId}`,
      { method: 'DELETE' }
    );
  }

  async getInvoices() {
    return this.request<Array<{
      id: string;
      stripeId: string;
      customerEmail: string;
      customerName?: string;
      items: Array<{ description: string; amount: number; quantity: number }>;
      total: number;
      status: string;
      hostedUrl?: string;
      pdfUrl?: string;
      dueDate?: string;
      createdAt: string;
    }>>('/admin-payments?action=invoices');
  }

  async createInvoice(data: {
    customerEmail: string;
    customerName?: string;
    items: Array<{ description: string; amount: number; quantity: number }>;
    dueDate?: string;
    memo?: string;
  }) {
    return this.request<{ id: string; hostedUrl?: string; pdfUrl?: string; total: number; status: string }>(
      '/admin-payments?action=invoice',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  async voidInvoice(invoiceId: string) {
    return this.request<{ success: boolean }>(
      `/admin-payments?action=invoice&invoiceId=${invoiceId}`,
      { method: 'DELETE' }
    );
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
