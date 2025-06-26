const BASE_URL = "http://localhost:5000/api";

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Network error" }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await this.handleResponse<any>(response);
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    return data;
  }

  async register(userData: any) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await this.handleResponse<any>(response);
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    return data;
  }

  logout() {
    localStorage.removeItem("authToken");
  }

  // Services endpoints
  async getServices(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.minPrice)
      params.append("minPrice", filters.minPrice.toString());
    if (filters?.maxPrice)
      params.append("maxPrice", filters.maxPrice.toString());

    const response = await fetch(`${BASE_URL}/services?${params}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any[]>(response);
  }

  async getService(id: string) {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any>(response);
  }

  async createService(serviceData: any) {
    const response = await fetch(`${BASE_URL}/services`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(serviceData),
    });

    return this.handleResponse<any>(response);
  }

  async updateService(id: string, serviceData: any) {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(serviceData),
    });

    return this.handleResponse<any>(response);
  }

  async deleteService(id: string) {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any>(response);
  }

  async toggleServiceStatus(id: string) {
    const response = await fetch(`${BASE_URL}/services/${id}/toggle-status`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any>(response);
  }

  // Bookings endpoints
  async getBookings() {
    const response = await fetch(`${BASE_URL}/bookings`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any[]>(response);
  }

  async getBooking(id: string) {
    const response = await fetch(`${BASE_URL}/bookings/${id}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any>(response);
  }

  async createBooking(bookingData: any) {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });

    return this.handleResponse<any>(response);
  }

  async updateBookingStatus(id: string, status: string) {
    const response = await fetch(`${BASE_URL}/bookings/${id}/status`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    return this.handleResponse<any>(response);
  }

  async cancelBooking(id: string) {
    const response = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any>(response);
  }

  // Dashboard endpoints
  async getDashboardStats() {
    const response = await fetch(`${BASE_URL}/dashboard/stats`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any>(response);
  }
}

export const apiService = new ApiService();
