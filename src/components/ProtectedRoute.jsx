import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Protects a route based on authentication and user role.
 *
 * @param {JSX.Element} children - The component to render.
 * @param {string} requiredRole - Optional: restricts access to this role only.
 */
export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useAuth();

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Restrict access if user role doesn't match requiredRole
  if (
    requiredRole &&
    user?.role?.toLowerCase() !== requiredRole.toLowerCase()
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
