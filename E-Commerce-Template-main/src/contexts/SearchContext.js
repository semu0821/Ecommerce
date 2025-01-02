import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const searchByCategory = (term) => {
    // Example filtering logic for categories
    const lowerTerm = term.toLowerCase();
    const allCategories = []; // Replace with your categories list
    const matchedCategories = allCategories.filter((category) =>
      category.name.toLowerCase().includes(lowerTerm)
    );
    setFilteredCategories(matchedCategories);
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchByCategory, filteredCategories }}
    >
      {children}
    </SearchContext.Provider>
  );
};
