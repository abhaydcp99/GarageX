import React, { useState } from "react";
import { FaLock, FaCreditCard, FaShieldAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { DataStore } from "../../data/mockData";

export default function Payment() {
  const location = useLocation();
  const { amount = 0, serviceName = "Pay", bookingId } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    method: "card",
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const cardRegex = /^(\d{4}[- ]?){3}\d{4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (formData.method === "card") {
      if (!cardRegex.test(formData.cardNumber))
        newErrors.cardNumber = "Invalid card number";
      if (!expiryRegex.test(formData.expiry))
        newErrors.expiry = "Invalid expiry (MM/YY)";
      if (!cvvRegex.test(formData.cvv)) newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setProcessing(true);
    setTimeout(() => {
      DataStore.updateBooking(bookingId, {
        status: "confirmed",
        paymentStatus: "paid",
      });
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard/customer"), 1500);
    }, 2000);
  };

  const gst = Math.round(amount * 0.18);
  const total = amount + gst;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl p-8 space-y-6 text-white">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Garage {serviceName}
        </h1>

        {success ? (
          <div className="bg-green-600/20 border border-green-400 text-green-300 text-center p-4 rounded-xl animate-bounce shadow-md">
            ✅ Payment Successful! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Payment Method
              </label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full bg-transparent border border-purple-400 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="card">Credit / Debit Card</option>
                <option value="upi">UPI</option>
                <option value="cod">Cash on Service</option>
              </select>
            </div>

            {formData.method === "card" && (
              <>
                <div>
                  <label className="block text-sm font-semibold">
                    Card Number
                  </label>
                  <input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full mt-1 px-4 py-2 bg-transparent border border-cyan-400 rounded-xl focus:outline-none"
                    maxLength={19}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold">
                      Expiry
                    </label>
                    <input
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full mt-1 px-4 py-2 bg-transparent border border-cyan-400 rounded-xl focus:outline-none"
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-sm">{errors.expiry}</p>
                    )}
                  </div>

                  <div className="w-1/2">
                    <label className="block text-sm font-semibold">CVV</label>
                    <input
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      className="w-full mt-1 px-4 py-2 bg-transparent border border-cyan-400 rounded-xl focus:outline-none"
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="bg-white/10 border border-white/20 rounded-xl p-4 shadow-md space-y-2">
              <h3 className="font-semibold text-lg">🧾 Summary</h3>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>${amount}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>${gst}</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between font-bold text-pink-300">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 text-xs text-gray-300 mt-2">
              <span className="flex items-center gap-1">
                <FaLock /> SSL
              </span>
              <span className="flex items-center gap-1">
                <FaShieldAlt /> Encrypted
              </span>
              <span className="flex items-center gap-1">
                <FaCreditCard /> Trusted
              </span>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 transition-all shadow-xl"
            >
              {processing ? "Processing..." : `Pay $${total} Securely`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
