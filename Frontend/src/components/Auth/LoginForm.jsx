import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, AlertCircle, Shield } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const success = await login(email, password, role); // ✅ Pass role here
      if (success) {
        navigate("/dashboard/" + role.toLowerCase());
      } else {
        setError("Invalid email, password, or role");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-blue-700">
            GarageX Login
          </h2>
          <p className="mt-2 text-gray-600">
            Access your dashboard by signing in
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-3 rounded-lg border border-red-300">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Role
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 text-gray-400" />
              <select
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Choose Role --</option>
                <option value="Customer">Customer</option>
                <option value="Provider">Provider</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-blue-600 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg transition-all shadow-md"
          >
            {isLoading ? "Signing in..." : "Sign In 🚀"}
          </button>
        </form>

        {/* Signup Prompt */}
        <div className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>

        {/* Demo Users */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
          <h3 className="font-semibold mb-2 text-gray-700">Test Accounts:</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <strong>Admin:</strong> admin@carservice.com / admin123
            </li>
            <li>
              <strong>Provider:</strong> provider@carservice.com / provider123
            </li>
            <li>
              <strong>Customer:</strong> customer@carservice.com / customer123
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
