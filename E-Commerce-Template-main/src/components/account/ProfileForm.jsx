import React, { lazy, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() =>
  import("../../components/account/ChangePasswordForm")
);

const MyProfileView = () => {
  const { user } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState("");

  const onSubmitProfile = async (values) => {
    console.log("Profile Updated:", values);
  };

  const onSubmitChangePassword = async (values) => {
    console.log("Password Changed:", values);
  };

  const onImageChange = async (file) => {
    if (file) {
      const base64Image = await getBase64(file);
      setImagePreview(base64Image);
    } else {
      setImagePreview("");
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-center">My Profile</h3>
      <div className="row g-4">
        {/* Profile Section */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <ProfileForm
                onSubmit={onSubmitProfile}
                onImageChange={onImageChange}
                imagePreview={imagePreview}
              />
            </div>
          </div>
        </div>

        {/* Password and Settings Section */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header bg-success text-white text-center">
              <h5>Change Password</h5>
            </div>
            <div className="card-body">
              <ChangePasswordForm onSubmit={onSubmitChangePassword} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileView;
