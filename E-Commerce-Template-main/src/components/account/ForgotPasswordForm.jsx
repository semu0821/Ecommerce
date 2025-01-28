import React, { useState } from "react";
import axios from "axios";
import { Field, reduxForm } from "redux-form";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, email as validateEmail } from "../../helpers/validation";
import { ReactComponent as IconEmail } from "bootstrap-icons/icons/envelope.svg";

const ForgotPasswordForm = (props) => {
  const { handleSubmit, submitting, onSubmit } = props;
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async (values) => {
    setError(""); // Clear any previous error messages
    const { email } = values;

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsSubmitting(true); // Indicate loading state
    try {
      // Make an API request to send the reset password link
      await axios.post(
        "https://modestserver.onrender.com/api/user/request-password-reset",
        { email }
      );
      setIsSubmitting(false);
      setEmailSent(true);

      // Notify parent component of successful submission, if required
      if (onSubmit) {
        onSubmit(values);
      }
    } catch (err) {
      console.error("Forgot password error: ", err);

      // Set appropriate error messages based on the API response
      const errorMessage =
        err.response?.data?.message ||
        "Failed to send password reset email. Please try again.";
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return emailSent ? (
    <div className="text-center">
      <h4 className="text-success">Password Reset Email Sent</h4>
      <p>Please check your email for a link to reset your password.</p>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      className="needs-validation p-4 shadow rounded bg-white"
      noValidate
    >
      <h4 className="text-center text-primary mb-4">Forgot Password</h4>
      <Field
        name="email"
        type="email"
        label="Email"
        component={renderFormGroupField}
        placeholder="Enter your email address"
        icon={IconEmail}
        validate={[required, validateEmail]}
        required={true}
        className="mb-3"
      />
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting || isSubmitting}
        >
          {isSubmitting ? (
            <span>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <p className="text-muted text-center small">
        Enter your email address, and we will send you a password reset link.
      </p>
    </form>
  );
};

export default reduxForm({
  form: "forgotPasswordForm",
})(ForgotPasswordForm);
