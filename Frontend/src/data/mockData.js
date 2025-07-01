// Mock Services
export const mockServices = [
  {
    id: "1",
    name: "Oil Change Service",
    description:
      "Complete oil change with high-quality motor oil and filter replacement",
    price: 49.99,
    duration: 30,
    category: "Maintenance",
    providerId: "2",
    providerName: "Service Provider",
    imageUrl:
      "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Brake Inspection & Repair",
    description: "Comprehensive brake system inspection and repair services",
    price: 149.99,
    duration: 90,
    category: "Safety",
    providerId: "2",
    providerName: "Service Provider",
    imageUrl:
      "https://images.pexels.com/photos/4489743/pexels-photo-4489743.jpeg",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Car Wash & Detailing",
    description: "Premium car wash with interior and exterior detailing",
    price: 89.99,
    duration: 120,
    category: "Cleaning",
    providerId: "2",
    providerName: "Service Provider",
    imageUrl: "https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Tire Rotation & Balance",
    description: "Professional tire rotation and wheel balancing service",
    price: 79.99,
    duration: 45,
    category: "Maintenance",
    providerId: "2",
    providerName: "Service Provider",
    imageUrl:
      "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

// Mock Bookings
export const mockBookings = [
  {
    id: "1",
    serviceId: "1",
    serviceName: "Oil Change Service",
    customerId: "3",
    customerName: "John Customer",
    customerEmail: "customer@carservice.com",
    customerPhone: "+1234567892",
    providerId: "2",
    providerName: "Service Provider",
    bookingDate: "2024-01-15",
    bookingTime: "10:00",
    status: "confirmed",
    totalAmount: 49.99,
    paymentStatus: "paid",
    customerAddress: "123 Main St, City, State",
    specialInstructions: "Please call before arriving",
    createdAt: "2024-01-10T00:00:00Z",
  },
];

// Mock data store
export class DataStore {
  static services = [...mockServices];
  static bookings = [...mockBookings];

  // Services
  static getServices() {
    return [...this.services];
  }

  static getServiceById(id) {
    return this.services.find((s) => s.id === id);
  }

  static addService(service) {
    const newService = {
      ...service,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.services.push(newService);
    return newService;
  }

  static updateService(id, updates) {
    const index = this.services.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.services[index] = { ...this.services[index], ...updates };
      return this.services[index];
    }
    return null;
  }

  static deleteService(id) {
    const index = this.services.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.services.splice(index, 1);
      return true;
    }
    return false;
  }

  // Bookings
  static getBookings() {
    return [...this.bookings];
  }

  static getBookingById(id) {
    return this.bookings.find((b) => b.id === id);
  }

  static getBookingsByCustomerId(customerId) {
    return this.bookings.filter((b) => b.customerId === customerId);
  }

  static addBooking(booking) {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  static updateBooking(id, updates) {
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...updates };
      return this.bookings[index];
    }
    return null;
  }

  static deleteBooking(id) {
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.bookings.splice(index, 1);
      return true;
    }
    return false;
  }
}
