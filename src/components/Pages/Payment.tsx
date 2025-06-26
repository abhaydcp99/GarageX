import React, { useState } from "react";

export default function Payment() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    method: "card",
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 space-y-8">
      <h2 className="text-3xl font-bold text-center">Secure Payment</h2>

      {success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center animate-bounce">
          ✅ Payment Successful!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl shadow-md"
        >
          <div>
            <label className="block font-medium mb-1">Payment Method</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="wallet">Digital Wallet</option>
            </select>
          </div>

          {formData.method === "card" && (
            <>
              <div>
                <label className="block font-medium">Card Number</label>
                <input
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block font-medium">Expiry Date</label>
                  <input
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block font-medium">CVV</label>
                  <input
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={3}
                    className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
            </>
          )}

          {/* Order Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>₹1000</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹180</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹1180</span>
            </div>
          </div>

          {/* SSL & Encryption */}
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
            <span>🔒 SSL Secured</span> • <span>🔐 End-to-End Encrypted</span>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full transition"
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      )}
    </div>
  );
}
