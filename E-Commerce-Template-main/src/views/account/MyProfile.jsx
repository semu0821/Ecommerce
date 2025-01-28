import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const MyProfileView = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfileData({
        phone_number: user.phone_number || "",
        password: "",
        confirmPassword: "",
      });
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleProfileUpdate = async () => {
    setError(null);
    setPasswordError(null);

    // Validate password match
    if (profileData.password && profileData.password !== profileData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Prepare data for the update
      const updateData = {
        phone_number: profileData.phone_number,
      };
      if (profileData.password) {
        updateData.password = profileData.password;
      }

      // Make API call to update user
      const response = await axios.put(
        `https://modestserver.onrender.com/api/user/${user._id}`,
        updateData
      );

      // Update local user state
      setUser((prev) => ({
        ...prev,
        phone_number: profileData.phone_number,
      }));

      setProfileData({
        ...profileData,
        password: "",
        confirmPassword: "",
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Your Profile</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <motion.div
        className="card mb-4 mx-auto"
        style={{ maxWidth: "500px", padding: "1rem" }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="card-body text-center">
          {/* Human Icon */}
          <FaUser size={50} className="mb-3 text-primary" />
          <h5 className="card-title">Profile Information</h5>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={user.name}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone_number"
              value={profileData.phone_number}
              onChange={(e) =>
                setProfileData({ ...profileData, phone_number: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={profileData.password}
              onChange={(e) =>
                setProfileData({ ...profileData, password: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={profileData.confirmPassword}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          {passwordError && (
            <div className="alert alert-danger">{passwordError}</div>
          )}
          <div className="d-flex justify-content-end gap-3">
            <motion.button
              className="btn btn-primary"
              onClick={handleProfileUpdate}
              disabled={loading}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? "Updating..." : "Update Profile"}
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              Back
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MyProfileView;