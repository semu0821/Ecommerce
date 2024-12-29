import React from "react";
import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            E-Commerce
          </Link>
          <div className="d-flex">
            <Link className="btn btn-outline-light me-2" to="/account/signin">
              Sign In
            </Link>
            <Link className="btn btn-primary" to="/account/signup">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Frame */}
     
    </>
  );
};

export default TopMenu;
