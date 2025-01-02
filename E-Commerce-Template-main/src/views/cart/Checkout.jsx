import { useLocation } from "react-router-dom";

import { useState,useEffect } from "react";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";



const CheckoutView = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const {state:orderData}= useLocation()
useEffect(() => {
  const fetchCartData = async () => {
    try {
      // Fetch cart IDs from localStorage
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Map IDs to fetch full product details from the backend
      const productIds = storedCart.map((item) => item._id);
      console.log(productIds);

      if (productIds.length > 0) {
        const response = await axios.get(`https://modestserver.onrender.com/api/products/${productIds}`);
        const products = response.data;
        console.log(products);

        // Update cart with full product data and quantities from stored cart
        // const updatedCart = storedCart.map((item) => {
        //   const product = products.find((p) => p._id === item._id);
        //   return {
        //     ...product,
        //     quantity: item.quantity, // Set the quantity from the localStorage cart
        //   };
        // });
        setCart(products);
        console.log(cart)
      } else {
        
        setCart([]);
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to load cart items.");
      setLoading(false);
    }
  };

  fetchCartData();
}, []);

const calculateTotal = () => {
  return cart.reduce((total, item) => total + parseFloat(item.price.$numberDecimal) * item.quantity, 0).toFixed(2);
};

console.log(orderData)
  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Checkout</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-header">
                <i className="bi bi-envelope"></i> Contact Info
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      aria-label="Email Address"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile no"
                      aria-label="Mobile no"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <i className="bi bi-truck"></i> Shipping Infomation
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address 2 (Optional)"
                    />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value>-- Country --</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value>-- State --</option>
                      <option>California</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <i className="bi bi-receipt"></i> Billing Infomation
                <div className="form-check form-check-inline ms-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Same as Shipping Infomation
                  </label>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address 2 (Optional)"
                    />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value>-- Country --</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value>-- State --</option>
                      <option>California</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3 border-info">
              <div className="card-header bg-info">
                <i className="bi bi-credit-card-2-front"></i> Payment Method
              </div>
              <div className="card-body">
                <div className="row g-3 mb-3 border-bottom">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        defaultChecked
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
                        Credit card
                        <img
                          src="../../images/payment/cards.webp"
                          alt="..."
                          className="ms-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        PayPal
                        <img
                          src="../../images/payment/paypal_64.webp"
                          alt="..."
                          className="ms-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Card number"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Expiration month"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Expiration year"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer border-info d-grid">
                <button type="button" className="btn btn-info">
                  Pay Now <strong>$162</strong>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <i className="bi bi-cart3"></i> Cart{" "}
                <span className="badge bg-secondary float-end">3</span>
              </div>
              <ul className="list-group list-group-flush">
  {cart.map((item) => (
    <li
      key={item._id}
      className="list-group-item d-flex justify-content-between lh-sm"
    >
      <div>
        <h6 className="my-0">{item.name}</h6>
        <small className="text-muted">
          {item.description || "No description available"}
        </small>
      </div>
      <span className="text-muted">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </li>
 
  // <li className="list-group-item d-flex justify-content-between bg-light">
  //   <div className="text-success">
  //     <h6 className="my-0">Promo code</h6>
  //     <small>EXAMPLECODE</small>
  //   </div>
  //   <span className="text-success">−$50</span>
  // </li>

  // {/* Total Amount */}
  // <li className="list-group-item d-flex justify-content-between">
  //   <span>Total (USD)</span>
  //   <strong>${item.total_quantity}</strong>
  // </li>
  ))}

</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
