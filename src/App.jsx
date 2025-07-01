import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContextProvider, useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Layout/Header";
import { HomePage } from "./components/Home/HomePage";
import { LoginForm } from "./components/Auth/LoginForm";
import { RegisterForm } from "./components/Auth/RegisterForm";
import { ServicesList } from "./components/Services/ServicesList";
import { BookingForm } from "./components/Booking/BookingForm";
import { AdminDashboard } from "./components/Dashboard/AdminDashboard";
import { CustomerDashboard } from "./components/Dashboard/CustomerDashboard";
import ProviderDashboard from "./components/Dashboard/ProviderDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Payment from "./components/Pages/Payment";
import Footer from "./components/Layout/Footer";

function DashboardRouter() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "provider":
      return <ProviderDashboard />;
    case "customer":
      return <CustomerDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/services" element={<ServicesList />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/payment" element={<Payment />} />
              <Route
                path="/book/:serviceId"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <BookingForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/customer"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/provider"
                element={
                  <ProtectedRoute requiredRole="provider">
                    <ProviderDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/:role"
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
