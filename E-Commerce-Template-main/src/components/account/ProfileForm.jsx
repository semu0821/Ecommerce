import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import {
  required,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
  email,
} from "../../helpers/validation";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconEnvelop } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconGeoAlt } from "bootstrap-icons/icons/geo-alt.svg";
import { ReactComponent as IconCalendarEvent } from "bootstrap-icons/icons/calendar-event.svg";

const ProfileForm = (props) => {
  const {
    handleSubmit,
    submitting,
    onSubmit,
    submitFailed,
    onImageChange,
    imagePreview,
    initialize,
    userData,
  } = props;

  useEffect(() => {
    if (userData) {
      initialize({
        name: userData.name || "",
        mobileNo: userData.phone_number || "",
        email: userData.email || "",
        role: userData.role || "",
        createdAt: userData.createdAt || "",
      });
    }
  }, [userData, initialize]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="card border-0 shadow rounded-3">
        <div className="card-header bg-primary text-white text-center py-3">
          <h4 className="mb-0">Edit Profile</h4>
        </div>
        <div className="card-body">
          {/* Profile Picture */}
          <div className="text-center mb-4">
            <img
              src={imagePreview || "../../images/NO_IMG.png"}
              alt="Profile"
              className="rounded-circle img-fluid shadow-sm"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <Field
              name="formFile"
              component={renderFormFileInput}
              onImageChange={onImageChange}
              validate={[required]}
              className="mt-2"
              tips="Upload a photo (max 5MB)"
            />
          </div>

          {/* Input Fields */}
          <Field
            name="name"
            type="text"
            component={renderFormGroupField}
            label="Name"
            icon={IconPerson}
            validate={[required, name]}
            placeholder="Enter your name"
            required
          />
          <Field
            name="mobileNo"
            type="number"
            component={renderFormGroupField}
            label="Phone Number"
            icon={IconPhone}
            validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
            placeholder="Enter your phone number"
            required
          />
          <Field
            name="email"
            type="email"
            component={renderFormGroupField}
            label="Email"
            icon={IconEnvelop}
            validate={[required, email]}
            placeholder="Enter your email address"
            required
          />
          <Field
            name="role"
            type="text"
            component={renderFormGroupField}
            label="Role"
            icon={IconGeoAlt}
            placeholder="Role"
            disabled
          />
          <Field
            name="createdAt"
            type="text"
            component={renderFormGroupField}
            label="Account Created At"
            icon={IconCalendarEvent}
            placeholder="Date"
            disabled
          />

          {/* Submit Button */}
          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={submitting}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "profile",
    enableReinitialize: true,
  })
)(ProfileForm);
