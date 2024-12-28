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
      <div className="container mt-4">
        <div className="card shadow-lg border-0">
          <img
            src="/images/banner/order.jpg" // Static image in the public folder
            className="card-img"
            alt="E-Commerce Banner"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <div
            className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              background: "rgba(0, 0, 0, 0.4)", // Transparent black background with 40% opacity
            }}
          >
            <h1 className="text-white fw-bold display-4">Shop the Best Deals</h1>
            <p className="text-white fs-5">
              Discover exclusive offers on the latest trends in fashion,
              electronics, and more.
            </p>
            <Link to="/category" className="btn btn-light btn-lg">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMenu;
