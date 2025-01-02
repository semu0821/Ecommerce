import React, { useContext } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link, useNavigate } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import {
  required,
  maxLength20,
  minLength8,
  email,
} from "../../helpers/validation"; // Assuming email validation is added
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg"; // Email icon
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg"; // Password icon
import { AuthContext } from "../../contexts/AuthContext"; // Import AuthContext

const SignInForm = (props) => {
  const { handleSubmit, submitting, submitFailed } = props;
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useContext(AuthContext); // Destructure login from AuthContext

  // Handle form submission
  const handleFormSubmit = async (formValues) => {
    try {
      await login(formValues.email, formValues.password); // Use login from AuthContext
      navigate("/"); // Redirect to the home page upon successful login
    } catch (error) {
      // Handle login error
      alert(error.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)} // Use the handleFormSubmit function
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      {/* Email field */}
      <Field
        name="email"
        type="email"
        label="Email"
        component={renderFormGroupField}
        placeholder="Enter your email"
        icon={IconEnvelope}
        validate={[required, email]} // Email validation added
        required={true}
        className="mb-3"
      />

      {/* Password field */}
      <Field
        name="password"
        type="password"
        label="Your password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLock}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
      />

      {/* Submit button */}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Log In
        </button>
      </div>

      {/* Links */}
      <Link className="float-start" to="/account/signup" title="Sign Up">
        Create your account
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
    form: "signin",
  })
)(SignInForm);
