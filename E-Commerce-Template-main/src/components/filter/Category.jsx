import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from your server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://modestserver.onrender.com/api/categories/subcategory");
        setCategories(response.data);
        setFilteredCategories(response.data); // Initialize filtered categories
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories: ", err);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories based on search term
  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    } else {
      setFilteredCategories(categories); // Reset to full list if no search term
    }
  }, [searchTerm, categories]);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <div className="card-body">
        {/* Search Input */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search subcategories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul
        className="list-group list-group-flush collapse show"
        id="filterCategory"
      >
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <li key={index} className="list-group-item">
              <button
                onClick={() => console.log("Category selected: ", category)}
                className="btn btn-link text-decoration-none text-start stretched-link"
              >
                {category.name}
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No categories match your search</li>
        )}
      </ul>
    </div>
  );
};

export default Category;
