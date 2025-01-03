import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext"; // Correctly import the context
import axios from "axios"; // Import axios to make the API request
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";

const TopMenu = () => {
  const { user, logout } = useContext(AuthContext); // Use logout from context
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]); // State to hold fetched categories

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://modestserver.onrender.com/api/categories/main");
        setCategories(response.data); // Set the categories from the API response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalCount = storedCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(totalCount);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/"); // Redirect to homepage or any other route you prefer
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(to right, rgb(0, 7, 8), rgb(42, 198, 242))",
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
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {/* Dynamically Render Categories */}
              {categories.length > 0 ? (
  categories.map((category) => (
    <li key={category._id} className="nav-item">
      <Link
        className="nav-link"
        to="/category/products"
        state={{ categoryName: category.name, categoryId: category._id }} // Pass data to the next page
      >
        {category.name}
      </Link>
    </li>
  ))
) : (
  <li className="nav-item">
    <span className="nav-link">Loading categories...</span>
  </li>
)}

            </ul>
            <div className="d-flex align-items-center">
              {/* Profile Dropdown */}
              <Dropdown className="me-3">
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-profile"
                  className="rounded-circle border-0 d-flex align-items-center justify-content-center p-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <i className="bi bi-person-fill text-light fs-4"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {user ? (
                    <>
                      <Dropdown.Item as={Link} to="/account/profile">
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/account/Wishlist">
                        Wishlist
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item as={Link} to="/account/signin">
                        Sign In
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/account/signup">
                        Register
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              {/* Cart Section */}
              <Link
                to="/cart"
                className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center p-3 position-relative"
                style={{
                  width: "50px",
                  height: "50px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                aria-label="Cart"
              >
                <i className="bi bi-cart3 fs-4 text-light"></i>
                {cartCount > 0 && (
                  <div
                    className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle"
                    style={{ fontSize: "0.9rem", padding: "0.2rem 0.4rem" }}
                  >
                    {cartCount}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopMenu;
