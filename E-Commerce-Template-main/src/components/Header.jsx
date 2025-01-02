import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { SearchContext } from "../contexts/SearchContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";

const Header = ({data}) => {
  
  const { searchTerm, setSearchTerm, searchByCategory, filteredCategories } = useContext(SearchContext);
  useEffect(() => {
    if (searchTerm !== '') {
      searchByCategory(searchTerm , data);
    }
  }, [searchTerm,data]); // Dependency array includes searchTerm

  // Input handler
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term); // Update search term in context
  };

 
  return (
    <header className="p-3 bg-light shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Logo Section */}
          <div className="col-md-3 col-sm-4 d-flex align-items-center">
            <Link to="/" aria-label="Home">
              <img
                alt="Company Logo"
                src="../../images/banner/Webp.net-resizeimage.png"
                style={{
                  width: "80px",
                  height: "auto",
                  objectFit: "contain",
                }}
                className="img-fluid"
              />
            </Link>
          </div>

          {/* Search Bar */}
          {/* <div className="col-md-6 col-sm-8 d-flex justify-content-center">
            <div className="search-container d-flex align-items-center position-relative w-100">
              <input
                type="text"
                className="form-control search-input form-control-lg rounded-pill shadow-sm"
                placeholder="Search for products or categories..."
                value={searchTerm} // Bind to searchTerm from context
                onChange={handleSearchChange}
                style={{
                  paddingLeft: "2.5rem",
                  fontSize: "1rem",
                  maxWidth: "600px",
                }}
                aria-label="Search products or categories"
              />
              <i
                className="fas fa-search search-icon position-absolute"
                style={{ left: "15px", fontSize: "1.2rem", color: "#007bff" }}
                aria-hidden="true"
              ></i>
            </div> */}
          {/* </div> */}

          {/* Profile and Cart Section */}
          <div className="col-md-3 col-sm-12 d-flex justify-content-end align-items-center">
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
                <Dropdown.Item as={Link} to="/account/profile">
                  <i className="bi bi-person-square"></i> My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/account/orders">
                  <i className="bi bi-list-check text-primary"></i> Orders
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/account/wishlist">
                  <i className="bi bi-heart-fill text-danger"></i> Wishlist
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/account/notification">
                  <i className="bi bi-bell-fill text-primary"></i> Notification
                </Dropdown.Item>
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
              <div
                className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle"
                style={{ fontSize: "0.9rem", padding: "0.2rem 0.4rem" }}
              >
                2
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
