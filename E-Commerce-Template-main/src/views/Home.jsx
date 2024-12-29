import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="container mt-4">
     <div className="container mt-4">
          <div className="card shadow-lg border-0">
          <img
            src="/images/banner/order.jpg" // Static image in the public folder
            className="card-img"
            alt="E-Commerce Banner"
            style={{ height: "400px", objectFit: "cover" }}
          /> 
          
            <div
              className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center"
              style={{
                background: "rgba(0, 0, 0, 0.4)", // Transparent black background with 40% opacity
              }}
            >
              <h1 className="text-white fw-bold display-4">Shop the Best Deals</h1>
              <p className="text-white fs-5">
                Discover exclusive offers on the latest trends in fashion,
                electronics, and more.
              </p>
              <Link to="/category" className="btn btn-light btn-lg">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Clothing Frame */}
          <div className="col-md-3">
            <div className="card text-center shadow-lg" style={{ maxWidth: "250px", margin: "auto" }}>
              <img
                src="/images/banner/clothing.jpg" // Static image in the public folder
                className="card-img-top"
                alt="Clothing"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Clothing</h5>
                <p className="card-text">Explore a wide range of clothing for all occasions.</p>
                <Link to="/category/clothing" className="btn btn-primary">
                  Shop Clothing
                </Link>
              </div>
            </div>
          </div>

          {/* Accessories Frame */}
          <div className="col-md-3">
            <div className="card text-center shadow-lg" style={{ maxWidth: "250px", margin: "auto" }}>
              <img
                src="/images/banner/accessory.jpg" // Static image in the public folder
                className="card-img-top"
                alt="Accessories"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Accessories</h5>
                <p className="card-text">Discover accessories to complement your style.</p>
                <Link to="/category/accessories" className="btn btn-primary">
                  Shop Accessories
                </Link>
              </div>
            </div>
          </div>

          {/* Home Materials Frame */}
          <div className="col-md-3">
            <div className="card text-center shadow-lg" style={{ maxWidth: "250px", margin: "auto" }}>
              <img
                src="/images/banner/mejlis.jpg" // Static image in the public folder
                className="card-img-top"
                alt="Home Materials"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Home Materials</h5>
                <p className="card-text">Upgrade your home with top-quality materials.</p>
                <Link to="/category/home-materials" className="btn btn-primary">
                  Shop Home Materials
                </Link>
              </div>
            </div>
          </div>

          {/* Car Accessories Frame */}
          <div className="col-md-3">
            <div className="card text-center shadow-lg" style={{ maxWidth: "250px", margin: "auto" }}>
              <img
                src="/images/banner/car.jpg" // Static image in the public folder
                className="card-img-top"
                alt="Car Accessories"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Car Accessories</h5>
                <p className="card-text">Find the best accessories for your car.</p>
                <Link to="/category/car-accessories" className="btn btn-primary">
                  Shop Car Accessories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
