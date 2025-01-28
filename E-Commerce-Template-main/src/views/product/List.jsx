import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


// Lazy-loaded components
const Paging = lazy(() => import("../../components/Paging"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const CardProductGrid = lazy(() => import("../../components/card/CardProductGrid"));
const CardProductList = lazy(() => import("../../components/card/CardProductList"));

const ProductListView = () => {
  const location = useLocation(); // Access the passed data
  const { categoryName, categoryId } = location.state || {};

  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [view, setView] = useState("list");
  const [priceFilter, setPriceFilter] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
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
  }, [searchTerm, selectedCategory, priceFilter, selectedSizes, selectedColors]);

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
      filteredProducts = filteredProducts.filter((product) => {
        const category = product.category;
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

 

    if (selectedSizes.length > 0) {
      console.log(filteredProducts)
      filteredProducts = filteredProducts.filter((product) =>
        Array.isArray(product.size) &&
        product.size.some((sizeObj) => selectedSizes.includes(sizeObj.name))
      );
    }
    
    

   if (selectedColors.length > 0) {
    console.log(filteredProducts)
    console.log(selectedColors)
      filteredProducts = filteredProducts.filter((product) =>
        Array.isArray(product.color) &&
        product.color.some((colorObj) => selectedColors.includes(colorObj.name))
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

  // Clear all filters
  const handleClearFilters = () => {
    
    setSearchTerm(""); // Clear the search term
    setSelectedCategory([]); // Clear selected categories
    setPriceFilter([]); // Clear price filter
    setSelectedSizes([]); // Clear selected sizes
    setSelectedColors([]); // Clear selected colors
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
          <div className="col-md-3" style={{ marginTop: "30px" }}>
            <FilterCategory 
              onChange={(category) => setSelectedCategory(category)} 
              selectedCategory={selectedCategory} 
              categoryName={categoryName}  
              categoryId={categoryId}      
            />
               <FilterSize onSizeFilterChange={(sizes) => setSelectedSizes(sizes)} />
            <FilterColor
             
              onColorFilterChange={(colors) => setSelectedColors(colors)}
            />

            <FilterPrice 
              onChange={(priceRange) => setPriceFilter(priceRange)} 
              priceFilter={priceFilter} 
            />
<FilterClear onClearFilters={handleClearFilters} />
          </div>

          {/* Main Product List */}
          <div className="col-md-9" style={{ marginTop: "30px" }}>
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
