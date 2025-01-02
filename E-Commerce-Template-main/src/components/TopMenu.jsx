import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Correctly import the context

const TopMenu = () => {
  const { user, logout } = useContext(AuthContext); // Use logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/"); // Redirect to homepage or any other route you prefer
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(to right, rgb(0, 7, 8), rgb(42, 198, 242))", // Gradient from dark to light blue
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            E-Commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto d-flex flex-row">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category/clothing">
                  Clothing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category/accessories">
                  Accessories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category/clothing">
                  Home Materials
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category/accessories">
                  Car Accessories
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {user ? (
                <>
                  <Link className="btn btn-outline-light me-2">
                    {user.user.name} {/* Display user name */}
                  </Link>
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-light me-2" to="/account/signin">
                    Sign In
                  </Link>
                  <Link className="btn btn-primary" to="/account/signup">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style>
        {`
          .interactive-category:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </>
  );
};

export default TopMenu;
