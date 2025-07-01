import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/api";

const AuthContext = createContext(undefined);

export function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("currentUser");

    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user: { ...user, token }, // ✅ inject token into user
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  // 🔄 LOGIN
  const login = async (email, password, role) => {
    try {
      const response = await apiService.login(email, password, role);

      if (response.user && response.token) {
        const userWithToken = { ...response.user, token: response.token }; // ✅ add token

        localStorage.setItem("authToken", response.token);
        localStorage.setItem("currentUser", JSON.stringify(userWithToken)); // ✅ save full user
        setAuthState({
          user: userWithToken,
          isAuthenticated: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // 🔄 REGISTER
  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);

      if (response.user && response.token) {
        const userWithToken = { ...response.user, token: response.token }; // ✅ add token

        localStorage.setItem("authToken", response.token);
        localStorage.setItem("currentUser", JSON.stringify(userWithToken));
        setAuthState({
          user: userWithToken,
          isAuthenticated: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  // 🔄 LOGOUT
  const logout = () => {
    apiService.logout?.(); // optional
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
