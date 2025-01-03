import { lazy, Component } from "react";
const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() =>
  import("../../components/account/ChangePasswordForm")
);
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() =>
  import("../../components/account/CardListForm")
);

class MyProfileView extends Component {
  state = {
    imagePreview: "",
  };

  onSubmitProfile = async (values) => {
    // Handle profile form submission
    console.log("Profile Updated:", values);
  };

  onSubmitChangePassword = async (values) => {
    // Handle password change
    console.log("Password Changed:", values);
  };

  onImageChange = async (file) => {
    if (file) {
      const base64Image = await this.getBase64(file);
      this.setState({ imagePreview: base64Image });
    } else {
      this.setState({ imagePreview: "" });
    }
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  render() {
    return (
      <div className="container my-4">
        <h3 className="mb-4 text-center">My Profile</h3>
        <div className="row g-4">
          {/* Profile Section */}
          <div className="col-lg-4">
            <div className="card">
              {/* <div className="card-header bg-primary text-white text-center">
                <h5>Profile Information</h5>
              </div> */}
              <div className="card-body">
                <ProfileForm
                  onSubmit={this.onSubmitProfile}
                  onImageChange={this.onImageChange}
                  imagePreview={this.state.imagePreview}
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
                <ChangePasswordForm onSubmit={this.onSubmitChangePassword} />
              </div>
            </div>

          

           
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfileView;
