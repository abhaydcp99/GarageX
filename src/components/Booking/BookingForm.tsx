import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { DataStore } from "../../data/mockData";
import { Service } from "../../types";

export function BookingForm() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
    customerAddress: user?.address || "",
    specialInstructions: "",
    paymentMethod: "card",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (serviceId) {
      const foundService = DataStore.getServiceById(serviceId);
      setService(foundService || null);
    }
  }, [serviceId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !user) return;

    setError("");
    setIsSubmitting(true);

    try {
      const booking = DataStore.addBooking({
        serviceId: service.id,
        serviceName: service.name,
        customerId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || "",
        providerId: service.providerId,
        providerName: service.providerName,
        bookingDate: formData.bookingDate,
        bookingTime: formData.bookingTime,
        status: "pending",
        totalAmount: service.price,
        paymentStatus: "pending",
        customerAddress: formData.customerAddress,
        specialInstructions: formData.specialInstructions,
      });

      setTimeout(() => {
        DataStore.updateBooking(booking.id, {
          status: "confirmed",
          paymentStatus: "pending",
        });
        navigate("/payment", {
          state: {
            amount: booking.totalAmount,
            serviceName: booking.serviceName,
          },
        });
      }, 2000);
    } catch (err) {
      setError("Failed to create booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Service not found</p>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Service
          </h1>
          <p className="text-gray-600">
            Complete your booking for {service.name}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-green-600">
                    ${service.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{service.duration} mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider:</span>
                  <span className="font-semibold">{service.providerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-semibold">{service.category}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="bookingDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <Calendar className="inline h-4 w-4 mr-2" />
                      Preferred Date
                    </label>
                    <input
                      id="bookingDate"
                      name="bookingDate"
                      type="date"
                      required
                      min={today}
                      max={nextWeek}
                      value={formData.bookingDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bookingTime"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <Clock className="inline h-4 w-4 mr-2" />
                      Preferred Time
                    </label>
                    <select
                      id="bookingTime"
                      name="bookingTime"
                      required
                      value={formData.bookingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="customerAddress"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Service Address
                  </label>
                  <input
                    id="customerAddress"
                    name="customerAddress"
                    type="text"
                    required
                    value={formData.customerAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter address where service should be performed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="specialInstructions"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <MessageSquare className="inline h-4 w-4 mr-2" />
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    rows={3}
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special instructions for the service provider..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <CreditCard className="inline h-4 w-4 mr-2" />
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="paypal">UPI</option>
                    <option value="cash">Cash on Service</option>
                  </select>
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium text-gray-900">
                      Total Amount:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ${service.price}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting
                      ? "Processing Payment..."
                      : "Confirm Booking & Pay"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
