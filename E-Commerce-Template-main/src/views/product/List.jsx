import React, { lazy, Component } from "react";
import { data } from "../../data";

const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
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
    selectedCategory: "", // Add selectedCategory state
  };

  UNSAFE_componentWillMount() {
    this.applyFilters(); // Update to apply filters initially
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
    this.setState({ selectedCategory: category }, this.applyFilters); // Update selectedCategory and apply filters
  };

  applyFilters = () => {
    let products = this.getProducts();
    
    // Filter by category if selectedCategory exists
    if (this.state.selectedCategory) {
      products = products.filter(product =>
        product.category.toLowerCase() === this.state.selectedCategory.toLowerCase()
      );
    }

    const totalItems = products.length;

    this.setState({
      totalItems,
      currentProducts: products.slice(0, 9), // Show first 9 products by default
      currentPage: 1, // Reset to first page on filter change
    });
  };

  getProducts = () => {
    let products = data.products;

    // Apply price filter if it exists
    if (this.state.priceFilter.length > 0) {
      products = products.filter(product =>
        this.state.priceFilter.some(range =>
          product.price >= range[0] && product.price <= range[1]
        )
      );
    }

    // Duplicate products for pagination
    products = products.concat(products).concat(products).concat(products).concat(products);

    return products;
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/50-Banner.webp)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              T-Shirts
            </span>
          </div>
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory onCategoryFilterChange={this.onCategoryFilterChange} /> {/* Pass handler */}
              <FilterPrice onChange={this.onPriceFilterChange} />
              <FilterSize />
              <FilterStar />
              <FilterColor />
              <FilterClear />
              <FilterTag />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.totalItems} results for{" "}
                    <span className="text-warning">"t-shirts"</span>
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
                      aria-label="Grid"
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
                      aria-label="List"
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
                sizing=""
                alignment="justify-content-center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
