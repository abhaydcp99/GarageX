import React, { useState, useMemo, useEffect } from "react";
import { Wrench, Plus, Edit, Trash2, DollarSign, Calendar } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/api";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "Maintenance",
    imageUrl:
      "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allServices = await apiService.getServices();
        setServices(allServices.filter((s) => s.providerId === user.id));

        const allBookings = await apiService.getBookings();
        setBookings(allBookings.filter((b) => b.providerId === user.id));
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };
    if (user?.id) fetchData();
  }, [user?.id]);

  const stats = useMemo(() => {
    const relevantBookings = bookings.filter((b) => b.status !== "cancelled");
    return {
      totalServices: services.length,
      activeServices: services.filter((s) => s.isActive).length,
      totalBookings: bookings.length,
      totalRevenue: relevantBookings.reduce((sum, b) => sum + b.totalAmount, 0),
    };
  }, [services, bookings]);

  const handleSubmitService = async (e) => {
    e.preventDefault();
    const formData = {
      name: serviceForm.name,
      description: serviceForm.description,
      price: parseFloat(serviceForm.price),
      duration: parseInt(serviceForm.duration),
      category: serviceForm.category,
      imageUrl: serviceForm.imageUrl,
      providerId: user.id,
    };

    try {
      if (editingService) {
        await apiService.updateService(editingService.id, formData);
      } else {
        await apiService.createService({ ...formData, isActive: true });
      }
      const updatedServices = await apiService.getServices();
      setServices(updatedServices.filter((s) => s.providerId === user.id));
      setEditingService(null);
      setShowAddService(false);
      setServiceForm({
        name: "",
        description: "",
        price: "",
        duration: "",
        category: "Maintenance",
        imageUrl:
          "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg",
      });
    } catch (err) {
      console.error("Service submission failed:", err);
    }
  };

  const handleEditService = (service) => {
    setServiceForm({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      category: service.category,
      imageUrl: service.imageUrl,
    });
    setEditingService(service);
    setShowAddService(true);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await apiService.deleteService(id);
      const updatedServices = await apiService.getServices();
      setServices(updatedServices.filter((s) => s.providerId === user.id));
    }
  };

  const handleToggleServiceStatus = async (id) => {
    await apiService.toggleServiceStatus(id);
    const updatedServices = await apiService.getServices();
    setServices(updatedServices.filter((s) => s.providerId === user.id));
  };

  if (!user)
    return (
      <div className="text-center py-10 text-red-600">Unauthorized Access</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Provider Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Wrench />}
          label="Total Services"
          value={stats.totalServices}
        />
        <StatCard
          icon={<Wrench />}
          label="Active Services"
          value={stats.activeServices}
        />
        <StatCard
          icon={<Calendar />}
          label="Total Bookings"
          value={stats.totalBookings}
        />
        <StatCard
          icon={<DollarSign />}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
        />
      </div>

      <ServiceManagement
        services={services}
        onEdit={handleEditService}
        onDelete={handleDeleteService}
        onToggleStatus={handleToggleServiceStatus}
        onAddClick={() => setShowAddService(true)}
      />

      <RecentBookings bookings={bookings} />

      {showAddService && (
        <ServiceFormModal
          form={serviceForm}
          onChange={setServiceForm}
          onCancel={() => {
            setShowAddService(false);
            setEditingService(null);
          }}
          onSubmit={handleSubmitService}
          isEdit={!!editingService}
        />
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
      <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function ServiceManagement({
  services,
  onEdit,
  onDelete,
  onToggleStatus,
  onAddClick,
}) {
  return (
    <div className="bg-white rounded-lg shadow mb-8">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">My Services</h2>
        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </button>
      </div>
      {services.length === 0 ? (
        <div className="p-6 text-center text-gray-600">No services found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Service
                </th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">
                      {service.description.slice(0, 40)}...
                    </p>
                  </td>
                  <td className="text-center">{service.category}</td>
                  <td className="text-center">${service.price}</td>
                  <td className="text-center">{service.duration} min</td>
                  <td className="text-center">
                    <button
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        service.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      onClick={() => onToggleStatus(service.id)}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="flex justify-center gap-2 py-2">
                    <button
                      onClick={() => onEdit(service)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(service.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RecentBookings({ bookings }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
      </div>
      {bookings.length === 0 ? (
        <div className="p-6 text-center text-gray-600">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Date & Time</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t text-center">
                  <td className="px-4 py-2">
                    <div className="font-medium text-gray-900">
                      {booking.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.customerEmail}
                    </div>
                  </td>
                  <td>{booking.serviceName}</td>
                  <td>
                    {booking.bookingDate} {booking.bookingTime}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>${booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ServiceFormModal({ form, onChange, onSubmit, onCancel, isEdit }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEdit ? "Edit Service" : "Add New Service"}
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Service Name"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <textarea
              value={form.description}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Description"
              rows={3}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, price: e.target.value }))
              }
              placeholder="Price"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="number"
              value={form.duration}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, duration: e.target.value }))
              }
              placeholder="Duration (min)"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <select
              value={form.category}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Maintenance">Maintenance</option>
              <option value="Repair">Repair</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Safety">Safety</option>
              <option value="Performance">Performance</option>
            </select>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
