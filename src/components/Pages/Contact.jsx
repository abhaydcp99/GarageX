import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

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
    <div className="min-h-screen px-4 py-12 md:px-20 bg-[#0f172a] text-white font-sans">
      {/* Header */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Let's Talk
      </motion.h2>

      {/* Success message */}
      {submitted && (
        <motion.div
          className="bg-green-600/20 text-green-300 border border-green-400 px-6 py-3 rounded-xl text-center mb-6 shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ Your message has been sent! We'll reach out shortly.
        </motion.div>
      )}

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-slate-700 max-w-3xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-cyan-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="John Doe"
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
              className="w-full bg-transparent border border-purple-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>
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
            className="w-full bg-transparent border border-pink-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select Category</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Your Message
          </label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-blue-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitted}
          className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
        >
          {submitted ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      {/* Contact Info */}
      <div className="mt-16 max-w-3xl mx-auto text-center text-gray-300 space-y-4">
        <div className="flex flex-col md:flex-row justify-center gap-10">
          <p className="flex items-center justify-center gap-2">
            <FaEnvelope className="text-cyan-400" /> abhaysinhdcp@garagex.com
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaPhoneAlt className="text-green-400" /> +91 8908125125
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-pink-400" /> Pune, Maharashtra,
            India
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="mt-14 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-4">
          Visit Our Workshop
        </h3>
        <div className="rounded-xl overflow-hidden border border-slate-600 shadow-xl h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.047300780002!2d73.85674397503087!3d18.568280667866234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06f6f8b84e3%3A0x72a65c92e4784a6a!2sCDAC%20Acts%20Pune!5e0!3m2!1sen!2sin!4v1719505608256!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GarageX Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
