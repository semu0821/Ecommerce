import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          {/* Clothing Frame */}
          <div className="col-md-3">
            <div className="card text-center shadow-lg" style={{ maxWidth: "250px", margin: "auto" }}>
              <img
                src="/images/banner/clothing.jpg" // Static image in the public folder
                className="card-img-top"
                alt="Clothing"
                style={{ height: "150px", objectFit: "cover" }}
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
                style={{ height: "150px", objectFit: "cover" }}
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
                style={{ height: "150px", objectFit: "cover" }}
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
                style={{ height: "150px", objectFit: "cover" }}
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
