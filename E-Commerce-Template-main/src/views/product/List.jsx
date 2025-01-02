import React, { Component, lazy, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../contexts/SearchContext";

const Paging = lazy(() => import("../../components/Paging"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardProductGrid = lazy(() => import("../../components/card/CardProductGrid"));
const CardProductList = lazy(() => import("../../components/card/CardProductList"));

class ProductListView extends Component {
  static contextType = SearchContext;

  state = {
    products: [],
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
    priceFilter: [],
    selectedCategory: "",
    selectedRating: null,
    selectedSizes: [],
    selectedColors: [],
    searchTerm: "",
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get("https://modestserver.onrender.com/api/products");
      this.setState(
        {
          products: response.data,
          totalItems: response.data.length,
          loading: false,
        },
        this.applyFilters
      );
    } catch (error) {
      this.setState({ error: "Failed to load products.", loading: false });
    }
  }

  formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal);
    }
    return price;
  };

  onPageChanged = (page) => {
    const { currentPage, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = this.getFilteredProducts().slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts });
  };

  applyFilters = () => {
    const { searchTerm } = this.state;
    let filteredProducts = this.getFilteredProducts();

    // Filter products based on search term
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const totalItems = filteredProducts.length;

    this.setState({
      totalItems,
      currentProducts: filteredProducts.slice(0, 9),
      currentPage: 1,
    });
  };

  getFilteredProducts = () => {
    let products = [...this.state.products];

    if (this.state.priceFilter.length > 0) {
      products = products.filter((product) =>
        this.state.priceFilter.some(
          (range) =>
            this.formatPrice(product.price) >= range[0] &&
            this.formatPrice(product.price) <= range[1]
        )
      );
    }

    if (this.state.selectedCategory) {
      products = products.filter(
        (product) =>
          product.category.toLowerCase() === this.state.selectedCategory.toLowerCase()
      );
    }

    if (this.state.selectedRating) {
      products = products.filter((product) => product.star >= this.state.selectedRating);
    }

    if (this.state.selectedSizes.length > 0) {
      products = products.filter((product) =>
        this.state.selectedSizes.includes(product.size)
      );
    }

    if (this.state.selectedColors.length > 0) {
      products = products.filter((product) =>
        this.state.selectedColors.includes(product.color.toLowerCase())
      );
    }

    return products;
  };

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value }, this.applyFilters);
  };

  onChangeView = (viewType) => {
    this.setState({ view: viewType });
  };

  render() {
    const { loading, error, currentProducts, totalItems, view, searchTerm } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const renderProductGrid = currentProducts.map((product, idx) => (
      <div key={idx} className="col-md-4">
        <CardProductGrid
          data={{
            ...product,
            price: this.formatPrice(product.price),
            discount: this.formatPrice(product.discount),
          }}
        />
      </div>
    ));

    const renderProductList = currentProducts.map((product, idx) => (
      <div key={idx} className="col-md-12">
        <CardProductList
          data={{
            ...product,
            price: this.formatPrice(product.price),
            discount: this.formatPrice(product.discount),
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
              <FilterCategory onCategoryFilterChange={(category) => this.setState({ selectedCategory: category }, this.applyFilters)} />
              <FilterPrice onChange={(priceRange) => this.setState({ priceFilter: priceRange }, this.applyFilters)} />
              <FilterStar onRatingFilterChange={(rating) => this.setState({ selectedRating: rating }, this.applyFilters)} />
              <FilterSize onSizeFilterChange={(sizes) => this.setState({ selectedSizes: sizes }, this.applyFilters)} />
              <FilterColor
                selectedColors={this.state.selectedColors}
                onColorFilterChange={(colors) => this.setState({ selectedColors: colors }, this.applyFilters)}
              />
              <FilterClear onClearFilters={() => this.setState(
                {
                  priceFilter: [],
                  selectedCategory: "",
                  selectedRating: null,
                  selectedSizes: [],
                  selectedColors: [],
                },
                this.applyFilters
              )} />
            </div>

            {/* Main Product List */}
            <div className="col-md-6">
              {/* Search Bar */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={this.onSearchChange}
                />
              </div>
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-end">
                  <select
                    className="form-select mw-180 float-start"
                    aria-label="Default select"
                  >
                    <option value={1}>Most Popular</option>
                    <option value={2}>Latest items</option>
                    <option value={3}>Trending</option>
                    <option value={4}>Price low to high</option>
                    <option value={5}>Price high to low</option>
                  </select>
                  <div className="btn-group ms-3" role="group">
                    <button
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
                    >
                      <i className="bi bi-grid" />
                    </button>
                    <button
                      type="button"
                      onClick={() => this.onChangeView("list")}
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
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
