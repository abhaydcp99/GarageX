import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaLock, FaShieldAlt, FaCreditCard } from "react-icons/fa";

export default function Payment() {
  const location = useLocation();
  const { amount = 0, serviceName = "Unknown Service" } = location.state || {};

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

    if (formData.method === "card") {
      const cardRegex = /^(\d{4}[- ]?){3}\d{4}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;

      if (!cardRegex.test(formData.cardNumber)) {
        newErrors.cardNumber =
          "Enter a valid 16-digit card number (e.g., 1234 5678 9012 3456)";
      }

      if (!expiryRegex.test(formData.expiry)) {
        newErrors.expiry = "Enter a valid expiry date (MM/YY)";
      }

      if (!cvvRegex.test(formData.cvv)) {
        newErrors.cvv = "Enter a valid 3-digit CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  const gst = Math.round(amount * 0.18);
  const total = amount + gst;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-lg w-full backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          🔐 Pay for {serviceName}
        </h2>

        {success ? (
          <div className="bg-green-100 text-green-800 text-center p-4 rounded-xl shadow-md animate-bounce">
            ✅ Payment Successful! Thank you 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Payment Method */}
            <div>
              <label className="block font-semibold mb-1">Payment Method</label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="bank">UPI</option>
                <option value="wallet">Cash on Service</option>
              </select>
            </div>

            {/* Card Details */}
            {formData.method === "card" && (
              <>
                <div>
                  <label className="block font-semibold">Card Number</label>
                  <input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block font-semibold">Expiry</label>
                    <input
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
                    />
                    {errors.expiry && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.expiry}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label className="block font-semibold">CVV</label>
                    <input
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
                    />
                    {errors.cvv && (
                      <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Order Summary */}
            <div className="bg-white/90 border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">💳 Order Summary</h3>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>${amount}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>${gst}</span>
              </div>
              <hr className="border-t" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Security Info */}
            <div className="flex justify-center gap-4 text-xs text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <FaLock /> SSL Secured
              </span>
              <span className="flex items-center gap-1">
                <FaShieldAlt /> Encrypted
              </span>
              <span className="flex items-center gap-1">
                <FaCreditCard /> Trusted Gateway
              </span>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md"
            >
              {processing ? "Processing..." : `💰 Pay $${total} Now`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
