import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Category = ({ onChange }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch main categories and subcategories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const [mainResponse, subResponse] = await Promise.all([
          axios.get("https://modestserver.onrender.com/api/categories/main"),
          axios.get("https://modestserver.onrender.com/api/categories/subcategory"),
        ]);
        setMainCategories(mainResponse.data);
        setSubCategories(subResponse.data);
      } catch (err) {
        console.error("Error fetching categories: ", err);
        setError("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter main categories based on search term
  const filteredMainCategories = useMemo(
    () =>
      mainCategories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [mainCategories, searchTerm]
  );

  // Group subcategories by their main category
  const groupedSubCategories = useMemo(() => {
    return mainCategories.reduce((acc, mainCategory) => {
      acc[mainCategory._id] = subCategories.filter(
        (subCategory) => subCategory.main_category._id === mainCategory._id
      );
      return acc;
    }, {});
  }, [mainCategories, subCategories]);

  // Handle checkbox selection
  const handleCheckboxChange = (subCategoryName) => {
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(subCategoryName);
      const updatedSelection = isSelected
        ? prevSelected.filter((name) => name !== subCategoryName)
        : [...prevSelected, subCategoryName];

      onChange(updatedSelection); // Pass selected categories to the parent
      return updatedSelection;
    });
  };

  // Handle clearing all selected categories
  const handleClearSelection = () => {
    setSelectedCategories([]);
    onChange([]); // Notify parent that the selection is cleared
  };

  if (loading) return <div>Loading categories...</div>;
  if (error)
    return (
      <div>
        {error}
        <button className="btn btn-link" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );

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
          placeholder="Search categories or subcategories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="list-group list-group-flush collapse show" id="filterCategory">
        {filteredMainCategories.length > 0 ? (
          filteredMainCategories.map((mainCategory) => (
            <li key={mainCategory._id} className="list-group-item">
              <div className="fw-bold">{mainCategory.name}</div>
              <ul className="list-group">
                {groupedSubCategories[mainCategory._id]?.length > 0 ? (
                  groupedSubCategories[mainCategory._id].map((subCategory) => (
                    <li key={subCategory._id} className="list-group-item">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`subcategoryCheckbox-${subCategory._id}`}
                          checked={selectedCategories.includes(subCategory.name)}
                          onChange={() => handleCheckboxChange(subCategory.name)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`subcategoryCheckbox-${subCategory._id}`}
                        >
                          {subCategory.name}
                        </label>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No subcategories available</li>
                )}
              </ul>
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
