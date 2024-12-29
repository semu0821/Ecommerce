import React, { Component, lazy } from "react";
import { data } from "../../data";

const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardProductGrid = lazy(() => import("../../components/card/CardProductGrid"));
const CardProductList = lazy(() => import("../../components/card/CardProductList"));

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
    priceFilter: [],
    selectedCategory: "",
    selectedRating: null,
    selectedSizes: [],
    selectedColors: [],  // Added state for color filters
  };

  UNSAFE_componentWillMount() {
    this.applyFilters();
  }

  onPageChanged = (page) => {
    let products = this.getProducts();
    const { currentPage, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  onPriceFilterChange = (selectedRanges) => {
    this.setState({ priceFilter: selectedRanges }, this.applyFilters);
  };

  onCategoryFilterChange = (category) => {
    this.setState({ selectedCategory: category }, this.applyFilters);
  };

  onRatingFilterChange = (rating) => {
    this.setState({ selectedRating: rating }, this.applyFilters);
  };

  onSizeFilterChange = (selectedSizes) => {
    this.setState({ selectedSizes }, this.applyFilters);
  };

  onColorFilterChange = (selectedColors) => {
    this.setState({ selectedColors }, this.applyFilters);
  };

  onClearFilters = () => {
    // Reset all filter states to their initial values
    this.setState(
      {
        priceFilter: [],
        selectedCategory: "",
        selectedRating: null,
        selectedSizes: [],
        selectedColors: [],
      },
      this.applyFilters  // Apply the filters after reset
    );
  };

  applyFilters = () => {
    let products = this.getProducts();

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
        this.state.selectedColors.includes(product.color.toLowerCase())  // Assuming product color is stored as a string
      );
    }

    const totalItems = products.length;

    this.setState({
      totalItems,
      currentProducts: products.slice(0, 9),
      currentPage: 1,
    });
  };

  getProducts = () => {
    let products = data.products;

    if (this.state.priceFilter.length > 0) {
      products = products.filter((product) =>
        this.state.priceFilter.some(
          (range) => product.price >= range[0] && product.price <= range[1]
        )
      );
    }

    products = products.concat(products).concat(products).concat(products);  // Repeat the products (as per original logic)

    return products;
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory onCategoryFilterChange={this.onCategoryFilterChange} />
              <FilterPrice onChange={this.onPriceFilterChange} />
              <FilterStar onRatingFilterChange={this.onRatingFilterChange} />
              <FilterSize onSizeFilterChange={this.onSizeFilterChange} />
              <FilterColor
                selectedColors={this.state.selectedColors}
                onColorFilterChange={this.onColorFilterChange}
              />
              <FilterClear onClearFilters={this.onClearFilters} />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.totalItems} results found
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">
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
                      className={`btn ${
                        this.state.view === "grid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-grid" />
                    </button>
                    <button
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${
                        this.state.view === "list"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-list" />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "grid" &&
                  this.state.currentProducts.map((product, idx) => (
                    <div key={idx} className="col-md-4">
                      <CardProductGrid data={product} />
                    </div>
                  ))}
                {this.state.view === "list" &&
                  this.state.currentProducts.map((product, idx) => (
                    <div key={idx} className="col-md-12">
                      <CardProductList data={product} />
                    </div>
                  ))}
              </div>
              <hr />
              <Paging
                totalRecords={this.state.totalItems}
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
