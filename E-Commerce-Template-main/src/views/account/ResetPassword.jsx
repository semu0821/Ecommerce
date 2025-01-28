import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send a request to reset the password
      await axios.post(
        "https://modestserver.onrender.com/api/user/reset-password",
        {
          token,
          email,
          newPassword,
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate("/account/signin"); // Redirect after a short delay
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 py-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
          Reset Your Password
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
            Password successfully reset! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition focus:outline-none"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <a
              href="/account/signin"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
