import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subcategoriesVisible, setSubcategoriesVisible] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://modestserver.onrender.com/api/categories/main");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleToggleSubcategories = (categoryId) => {
    setSubcategoriesVisible((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle the visibility of the specific category's subcategories
    }));
  };

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="card shadow-lg border-0 mb-5">
        <img
          src="/images/banner/order.jpg"
          className="card-img"
          alt="E-Commerce Banner"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div
          className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center"
          style={{ background: "rgba(0, 0, 0, 0.4)" }}
        >
          <h1 className="text-white fw-bold display-4">Shop the Best Deals</h1>
          <p className="text-white fs-5">
            Discover exclusive offers on the latest trends in fashion, electronics, and more.
          </p>
          <Link to="/category" className="btn btn-light btn-lg">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories and Subcategories Section */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {loading ? (
          <div className="col text-center">
            <p>Loading categories...</p>
          </div>
        ) : categories.length > 0 ? (
          categories.map((category, index) => (
            <motion.div
              key={index}
              className="col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div className="card h-100 shadow-lg">
                <img
                  src={category.image}
                  className="card-img-top"
                  alt={category.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{category.title}</h5>
                  <p className="card-text flex-grow-1">{category.name}</p>
                  <Link to={category.link} className="btn btn-primary mt-auto">
                    Shop {category.title}
                  </Link>

                  {/* Toggle Subcategories */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="mt-3">
                      <button
                        onClick={() => handleToggleSubcategories(category._id)}
                        className="btn btn-secondary btn-sm"
                      >
                        {subcategoriesVisible[category._id] ? "Hide Subcategories" : "Show Subcategories"}
                      </button>

                      {/* Show subcategories if the corresponding category is expanded */}
                      {subcategoriesVisible[category._id] && (
                        <ul className="list-unstyled mt-3">
                          {category.subcategories.map((subcategory, subIndex) => (
                            <li key={subIndex}>
                              <Link to={subcategory.link} className="text-decoration-none">
                                {subcategory.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col text-center">
            <p>No categories available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
