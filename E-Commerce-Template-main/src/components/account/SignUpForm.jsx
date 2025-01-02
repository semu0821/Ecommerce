import React, { useContext } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link, useNavigate } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import {
  required,
  maxLength20,
  minLength8,
  email,
  matchPassword,
  name,
} from "../../helpers/validation";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AuthContext } from "../../contexts/AuthContext"; // Import AuthContext

const SignUpForm = (props) => {
  const { handleSubmit, submitting, submitFailed } = props;
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); // Use register from AuthContext

  // Custom render function for Phone Input
  const renderPhoneInput = ({ input, meta }) => (
    <div className="form-group">
      <label>Mobile No</label>
      <PhoneInput
        {...input}
        country={"ET"}
        onChange={(value) => input.onChange(value)}
        inputProps={{
          name: input.name,
          placeholder: "Mobile no with country code",
        }}
        enableSearch={true}
        disableDropdown={false}
        specialLabel=""
        countryCodeEditable={false}
      />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );

  // Handle form submission and connect to context
  const handleFormSubmit = async (formValues) => {
    try {
      await register({
        name: `${formValues.firstName} ${formValues.lastName}`,
        email: formValues.email,
        password: formValues.password,
        phone_number: formValues.mobileNo,
        role: "customer",
      });

      // Notify success and navigate to another page
      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      {/* First Name */}
      <div className="row mb-3">
        <div className="col-md-6">
          <Field
            name="firstName"
            type="text"
            label="First Name"
            component={renderFormField}
            placeholder="First Name"
            validate={[required, name]}
            required={true}
          />
        </div>

        {/* Last Name */}
        <div className="col-md-6">
          <Field
            name="lastName"
            type="text"
            label="Last Name"
            component={renderFormField}
            placeholder="Last Name"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>

      {/* Email Field */}
      <Field
        name="email"
        type="email"
        label="Email"
        component={renderFormGroupField}
        placeholder="Enter your email"
        icon={IconEnvelope}
        validate={[required, email]}
        required={true}
        className="mb-3"
      />

      {/* Mobile Number with Country Code */}
      <Field
        name="mobileNo"
        component={renderPhoneInput}
        validate={[required]}
        required={true}
        className="mb-3"
      />

      {/* Password */}
      <Field
        name="password"
        type="password"
        label="Your Password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLock}
        validate={[required, minLength8, maxLength20]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
      />

      {/* Confirm Password */}
      <Field
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLock}
        validate={[required, matchPassword]}
        required={true}
        className="mb-3"
      />

      {/* Submit Button */}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Create Account
        </button>
      </div>

      {/* Links */}
      <Link className="float-start" to="/account/signin" title="Sign In">
        Sign In
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
