import React, { lazy, Suspense } from "react";

const ForgotPasswordForm = lazy(() =>
  import("../../components/account/ForgotPasswordForm")
);

const ForgotPasswordView = () => {
  const handleFormSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-md-center">
        <div className="col-md-4 p-3 border">
          <h4 className="text-center">Forgot Password</h4>
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordForm onSubmit={handleFormSubmit} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
