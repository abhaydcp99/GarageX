import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form processing
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", category: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

      {submitted && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded mb-4 text-center animate-bounce">
          ✅ Thank you for your feedback!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
      >
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Feedback Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Message</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitted}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full transition"
        >
          {submitted ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-10 text-center space-y-2 text-gray-600">
        <p>
          <strong>📧 Email:</strong> support@garagex.com
        </p>
        <p>
          <strong>📞 Phone:</strong> +91 98765 43210
        </p>
        <p>
          <strong>📍 Address:</strong> Pune, Maharashtra, India
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="mt-8 h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
        [Interactive Map Coming Soon]
      </div>
    </div>
  );
}
