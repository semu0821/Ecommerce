import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";

const TopMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isNavbarCollapsed, setNavbarCollapsed] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://modestserver.onrender.com/api/categories/main"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalCount = storedCart.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );
      setCartCount(totalCount);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavbarToggle = () => {
    setNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(to right, rgb(0, 7, 8), rgb(42, 198, 242))",
      }}
    >
      <div className="container-fluid">
    

<Link to="/category/products">
  <img
    src="/images/banner/Webp.net-resizeimage-removebg-preview.png"
    alt="Logo"
    style={{
      height: "50px",
      width: "auto",
      objectFit: "contain",
    }}
  />
</Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isNavbarCollapsed ? "false" : "true"}
          aria-label="Toggle navigation"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavbarCollapsed ? "" : "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id} className="nav-item">
                  {/* <Link
                    className="nav-link"
                    to="/category/products"
                    state={{
                      categoryName: category.name,
                      categoryId: category._id,
                    }}
                  >
                    {category.name}
                  </Link> */}
                </li>
              ))
            ) : (
              <li className="nav-item">
                <span className="nav-link">Loading categories...</span>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
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
                      <i className="bi bi-person-circle me-2"></i>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/account/wishlist">
                      <i className="bi bi-heart me-2"></i>
                      Wishlist
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/account/orders">
                      <i className="bi bi-box me-2"></i>
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/account/signin">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/account/signup">
                      <i className="bi bi-person-add me-2"></i>
                      Register
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

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
  );
};

export default TopMenu;
