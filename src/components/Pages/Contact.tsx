import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", category: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen px-6 py-12 md:px-16 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white font-sans">
      <motion.h2
        className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact GarageX
      </motion.h2>

      {submitted && (
        <motion.div
          className="bg-green-600/20 text-green-300 border border-green-400 px-6 py-3 rounded-lg text-center mb-6 backdrop-blur-md shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ Thanks for connecting! We'll get back to you soon.
        </motion.div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-700 max-w-2xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-cyan-400 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-purple-400 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Feedback Type
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-pink-400 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select Category</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Message</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-blue-400 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitted}
          className="w-full bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-500 py-3 rounded-xl text-white font-semibold hover:brightness-110 transition-all shadow-lg hover:shadow-cyan-600/30"
        >
          {submitted ? "Sending..." : "Send Message 🚀"}
        </button>
      </motion.form>

      {/* Contact Info */}
      <div className="text-center mt-14 space-y-2 text-gray-300">
        <p>
          <strong>📧 Email:</strong> abhaysinhdcp@garagex.com
        </p>
        <p>
          <strong>📞 Phone:</strong> +91 8908125125
        </p>
        <p>
          <strong>📍 Location:</strong> Pune, Maharashtra, India
        </p>
      </div>

      {/* Google Map Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-4 text-white">
          Find Us on Map 🗺️
        </h3>
        <div className="rounded-xl overflow-hidden border border-slate-600 shadow-lg h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.047300780002!2d73.85674397503087!3d18.568280667866234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06f6f8b84e3%3A0x72a65c92e4784a6a!2sCDAC%20Acts%20Pune!5e0!3m2!1sen!2sin!4v1719505608256!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
