import axios from "axios";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function CustomerDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/bookings/customer/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user, location.key]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(
          `http://localhost:5000/api/bookings/${bookingId}/cancel`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // Refetch bookings after cancel
        const res = await axios.get(
          `http://localhost:5000/api/bookings/customer/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setBookings(res.data);
      } catch (err) {
        console.error("Cancellation failed:", err);
      }
    }
  };

  const stats = {
    totalBookings: bookings.length,
    upcomingBookings: bookings.filter(
      (b) => b.status === "confirmed" || b.status === "pending"
    ).length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    totalSpent: bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, booking) => sum + booking.totalAmount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Manage your bookings and services here.
          </p>
        </div>

        {showMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">{location.state?.message}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            Icon={Calendar}
            title="Total Bookings"
            value={stats.totalBookings}
            color="blue"
          />
          <StatCard
            Icon={Clock}
            title="Upcoming"
            value={stats.upcomingBookings}
            color="yellow"
          />
          <StatCard
            Icon={Calendar}
            title="Completed"
            value={stats.completedBookings}
            color="green"
          />
          <StatCard
            Icon={DollarSign}
            title="Total Spent"
            value={`$${stats.totalSpent.toFixed(2)}`}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Book New Service</span>
            </Link>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              View Service History
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Update Profile
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
            <Link
              to="/services"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Book New Service
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookings yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by booking your first car service
              </p>
              <Link
                to="/services"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Browse Services</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <Th label="Service" />
                    <Th label="Date & Time" />
                    <Th label="Provider" />
                    <Th label="Status" />
                    <Th label="Payment" />
                    <Th label="Amount" />
                    <Th label="Actions" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.serviceName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.bookingDate}
                        <br />
                        {booking.bookingTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.providerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <PaymentBadge status={booking.paymentStatus} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${booking.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              alert(
                                `Booking Details:\n\nService: ${
                                  booking.serviceName
                                }\nProvider: ${booking.providerName}\nDate: ${
                                  booking.bookingDate
                                } at ${booking.bookingTime}\nAddress: ${
                                  booking.customerAddress
                                }\nInstructions: ${
                                  booking.specialInstructions || "None"
                                }\nAmount: $${booking.totalAmount}`
                              )
                            }
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {(booking.status === "pending" ||
                            booking.status === "confirmed") && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel Booking"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Components
const Th = ({ label }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {label}
  </th>
);

const StatusBadge = ({ status }) => {
  const styles =
    {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-purple-100 text-purple-800",
      cancelled: "bg-red-100 text-red-800",
    }[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles}`}
    >
      {status}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
  const styles =
    {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    }[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles}`}
    >
      {status}
    </span>
  );
};

const StatCard = ({ Icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center">
      <div
        className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}
      >
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);
