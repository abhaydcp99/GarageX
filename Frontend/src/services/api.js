const BASE_URL = "http://localhost:5000/api";

class ApiService {
  getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async handleResponse(response) {
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

  // 🔐 Auth endpoints
  async login(email, password, role) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }), // include role
    });

    const data = await this.handleResponse(response);
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    return data;
  }

  async register(userData) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await this.handleResponse(response);
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    return data;
  }

  logout() {
    localStorage.removeItem("authToken");
  }

  // 🛠️ Services endpoints
  async getServices(filters) {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.minPrice) params.append("minPrice", filters.minPrice);
    if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice);

    const response = await fetch(`${BASE_URL}/services?${params}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getService(id) {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async createService(serviceData) {
    const response = await fetch(`${BASE_URL}/services`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(serviceData),
    });

    return this.handleResponse(response);
  }

  async updateService(id, serviceData) {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(serviceData),
    });

    return this.handleResponse(response);
  }

  async deleteService(id) {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async toggleServiceStatus(id) {
    const response = await fetch(`${BASE_URL}/services/${id}/toggle-status`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // 📅 Bookings endpoints
  async getBookings() {
    const response = await fetch(`${BASE_URL}/bookings`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getBooking(id) {
    const response = await fetch(`${BASE_URL}/bookings/${id}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async createBooking(bookingData) {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });

    return this.handleResponse(response);
  }

  async updateBookingStatus(id, status) {
    const response = await fetch(`${BASE_URL}/bookings/${id}/status`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    return this.handleResponse(response);
  }

  async cancelBooking(id) {
    const response = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // 📊 Dashboard
  async getDashboardStats() {
    const response = await fetch(`${BASE_URL}/dashboard/stats`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
