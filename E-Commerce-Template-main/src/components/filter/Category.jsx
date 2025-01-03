import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = ({ onChange, categoryId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from your server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://modestserver.onrender.com/api/categories/main/${categoryId}`
        );
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories: ", err);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryId]);

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle checkbox selection
  const handleCheckboxChange = (category) => {
    const isSelected = selectedCategories.includes(category);

    const newSelectedCategories = isSelected
      ? selectedCategories.filter((selected) => selected !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);
    onChange(newSelectedCategories); // Pass selected categories to the parent
  };

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
          filteredCategories.map((category) => (
            <li key={category.id} className="list-group-item">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`categoryCheckbox${category.id}`}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCheckboxChange(category.name)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`categoryCheckbox${category.id}`}
                >
                  {category.name}
                </label>
              </div>
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
