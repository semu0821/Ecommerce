import React, { useState, useEffect, lazy, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";

// Lazy-loaded components
const Paging = lazy(() => import("../../components/Paging"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardProductGrid = lazy(() => import("../../components/card/CardProductGrid"));
const CardProductList = lazy(() => import("../../components/card/CardProductList"));

const ProductListView = () => {
  const location = useLocation(); // Access the passed data
  const { categoryName, categoryId } = location.state || {}; 
  console.log(categoryName)
  console.log(categoryId)
  // Destructure the state

  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [view, setView] = useState("list");
  const [priceFilter, setPriceFilter] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://modestserver.onrender.com/api/products");
        setProducts(response.data);
        setTotalItems(response.data.length);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, priceFilter, selectedRating, selectedSizes, selectedColors]);

  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal);
    }
    return price;
  };

  const onPageChanged = (page) => {
    const { currentPage, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const filteredProducts = getFilteredProducts();
    const currentProducts = filteredProducts.slice(offset, offset + pageLimit);
    setCurrentPage(currentPage);
    setCurrentProducts(currentProducts);
  };

  const applyFilters = () => {
    let filteredProducts = getFilteredProducts();

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setTotalItems(filteredProducts.length);
    setCurrentProducts(filteredProducts.slice(0, 9)); // Initial display
    setCurrentPage(1);
  };

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    if (priceFilter.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        priceFilter.some(
          (range) =>
            formatPrice(product.price) >= range[0] &&
            formatPrice(product.price) <= range[1]
        )
      );
    }

    if (selectedCategory.length > 0) {
      console.log(filteredProducts);
      filteredProducts = filteredProducts.filter((product) => {
        const category = product.category;
        console.log(category);
        console.log(selectedCategory);
    
        // Ensure category and category.name are defined
        return (
          category &&
          typeof category.name === 'string' &&
          selectedCategory.some(
            (selected) =>
              selected && selected.toLowerCase() === category.name.toLowerCase()
          )
        );
      });
    }
    
    
    

    if (selectedRating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.star >= selectedRating
      );
    }

    if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedSizes.includes(product.size)
      );
    }

    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedColors.includes(product.color.toLowerCase())
      );
    }

    return filteredProducts;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderProductGrid = currentProducts.map((product, idx) => (
    <div key={idx} className="col-md-4">
      <CardProductGrid
        data={{
          ...product,
          price: formatPrice(product.price),
          discount: formatPrice(product.discount),
        }}
      />
    </div>
  ));

  const renderProductList = currentProducts.map((product, idx) => (
    <div key={idx} className="col-md-12">
      <CardProductList
        data={{
          ...product,
          price: formatPrice(product.price),
          discount: formatPrice(product.discount),
        }}
      />
    </div>
  ));

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-md-3">
          <FilterCategory onChange={(category) => setSelectedCategory(category)} 
  
  categoryName={categoryName}  // Pass categoryName as prop to Category
  categoryId={categoryId}      // Pass categoryId as prop to Category
/>


            <FilterPrice onChange={(priceRange) => setPriceFilter(priceRange)} />
            <FilterStar onRatingFilterChange={(rating) => setSelectedRating(rating)} />
            <FilterSize onSizeFilterChange={(sizes) => setSelectedSizes(sizes)} />
            <FilterColor
              selectedColors={selectedColors}
              onColorFilterChange={(colors) => setSelectedColors(colors)}
            />
            <FilterClear onClearFilters={() => {
              setPriceFilter([]);
              setSelectedCategory("");
              setSelectedRating(null);
              setSelectedSizes([]);
              setSelectedColors([]);
            }} />
          </div>

          {/* Main Product List */}
          <div className="col-md-9">
            {/* Search Bar and Controls */}
            <div className="row align-items-center mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="col-md-4 d-flex justify-content-end">
                <select className="form-select">
                  <option value={1}>Most Popular</option>
                  <option value={2}>Latest items</option>
                  <option value={3}>Trending</option>
                  <option value={4}>Price low to high</option>
                  <option value={5}>Price high to low</option>
                </select>
              </div>
              <div className="col-md-2 d-flex justify-content-end">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={() => handleViewChange("grid")}
                    className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
                  >
                    <i className="bi bi-grid" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleViewChange("list")}
                    className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
                  >
                    <i className="bi bi-list" />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              {view === "grid" ? renderProductGrid : renderProductList}
            </div>
            <hr />
            <Paging
              totalRecords={totalItems}
              pageLimit={9}
              pageNeighbours={3}
              onPageChanged={onPageChanged}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductListView;
