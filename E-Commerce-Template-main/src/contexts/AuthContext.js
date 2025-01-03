// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information
  const [loading, setLoading] = useState(false); // Loading state for requests

  // Check if a user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user from localStorage if it exists
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post("https://modestserver.onrender.com/api/user/login", { email, password });
      const userData = response.data; // Assuming server returns user data
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Save user in local storage

      // Display success message
      toast.success("User logged in successfully!", {
        position: "top-left",
        autoClose: 5000, // Closes automatically after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      alert(errorMessage);
      throw error; // Optionally propagate the error
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post("https://modestserver.onrender.com/api/user/", formData);
      const userData = response.data; // Assuming server returns user data
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw error; // Propagate the error for the caller to handle
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
