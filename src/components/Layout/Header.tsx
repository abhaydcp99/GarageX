import React from "react";
import { Link, NavLink } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-900">
            GarageX
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </NavLink>
            <NavLink
              to="/payment"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Payment
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to={`/dashboard/${user?.role}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </NavLink>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{user?.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </NavLink>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
