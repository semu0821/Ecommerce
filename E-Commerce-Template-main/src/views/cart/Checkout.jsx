import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const CheckoutView = () => {
  const { state: orderData } = useLocation();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [contactInfo, setContactInfo] = useState({
    email: user?.user?.email || "",
    phone: user?.user?.phone_number || "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.user?.name || "",
    address: "",
    city: "",
  }
);
  const [orderSuccess, setOrderSuccess] = useState(null); // For success/error messages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetailsArray = [];
        for (const item of orderData.items) {
          const productId = item.product;
          const response = await axios.get(`https://modestserver.onrender.com/api/products/${productId}`);
          const productData = response.data;
  
          productData.price = Number(productData.price.$numberDecimal); // Convert decimal to number
          productData.discount = Number(productData.discount.$numberDecimal); // Convert discount if present
          productDetailsArray.push(productData);
        }
  
        setProductDetails(productDetailsArray); // Set all product details
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details.");
        setLoading(false);
      }
    };
  
    if (orderData.items.length > 0) {
      fetchProductDetails();
    }
  }, [orderData]);

  const calculateTotal = () => {
    return orderData.items.reduce(
      (total, item) => total + (productDetails?.find(pd => pd._id === item.product)?.price || 0) * item.quantity,
      0
    ).toFixed(2);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Validate address and city fields
    if (!shippingInfo.address.trim()) {
      setOrderSuccess("Address is required. Please fill in the address.");
      return;
    }
    if (!shippingInfo.city.trim()) {
      setOrderSuccess("City is required. Please fill in the city.");
      return;
    }

    const orderSummary = {
      user: {
        id: user?._id,
        email: contactInfo.email,
        phone: contactInfo.phone,
      },
      shippingInfo: {
        name: shippingInfo.name,
        address: shippingInfo.address,
        city: shippingInfo.city,
      },
      items: orderData.items.map((item, index) => ({
        product: item.product,
        quantity: item.quantity,
        price: productDetails[index]?.price || 0,
      })),
      total_price: parseFloat(calculateTotal()),
      status: "pending", // Ensure this matches the backend expected status
    };
    
    console.log(orderSummary)
    try {
      // Step 1: Register the order
      const orderResponse = await axios.post(`https://modestserver.onrender.com/api/orders`, orderSummary);

      if (orderResponse.status === 201) {
        console.log("Order registered successfully:", orderResponse.data);
        const { order } = orderResponse.data;

        // Step 2: Proceed to payment
        const paymentResponse = await axios.post(`https://modestserver.onrender.com/api/pay`, { orderSummary });

        if (paymentResponse.status === 200) {
          const checkoutUrl = paymentResponse.data.checkout_url;
          window.location.href = checkoutUrl; // Redirect to the payment gateway

          setOrderSuccess("Order placed and payment verified successfully!");
          const updatedOrderSummary = {
            ...orderSummary,
            invoice_number: order.invoice_number,
          };

          localStorage.removeItem("cart");
          localStorage.setItem("invoice", JSON.stringify(updatedOrderSummary));
        } else {
          console.log("Payment verification failed:", paymentResponse.data);
          setOrderSuccess("Payment verification failed. Please try again.");
        }
      } else {
        console.log("Order registration failed:", orderResponse.data);
        setOrderSuccess("Failed to register order. Please try again.");
      }
    } catch (error) {
      console.error("Error during process:", error.message);
      setOrderSuccess("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Checkout</h1>
      </div>
      {orderSuccess && <div className="alert alert-danger">{orderSuccess}</div>}

      <div className="container mb-3">
        <div className="row">
          {/* Left column: Contact Info and Shipping Info */}
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
                      name="email"
                      value={contactInfo.email}
                      className="form-control"
                      placeholder="Email Address"
                      onChange={handleContactChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      name="phone"
                      value={contactInfo.phone}
                      className="form-control"
                      placeholder="Mobile no"
                      onChange={handleContactChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <i className="bi bi-truck"></i> Shipping Information
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      className="form-control"
                      placeholder="Name"
                      required
                      onChange={handleShippingChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={shippingInfo.address}
                      className="form-control"
                      placeholder="Address"
                      required
                      onChange={handleShippingChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={shippingInfo.city}
                      className="form-control"
                      placeholder="City"
                      required
                      onChange={handleShippingChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Product Details and Order Summary */}
        </div>
        <div className="">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <i className="bi bi-check-circle"></i> Order Summary
            </div>
            <div className="card-body p-4">
              {loading ? (
                <p>Loading product details...</p>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <div>
                  <h5 className="text-xl font-semibold mb-3">Product Details:</h5>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productDetails && productDetails.length > 0 && orderData.items.map((item, index) => (
                        <tr key={index}>
                          <td>{productDetails[index]?.name}</td>
                          <td>${productDetails[index]?.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(productDetails[index]?.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4">
                    <h5 className="text-lg font-semibold">Contact Info:</h5>
                    <p>Email: {contactInfo.email}</p>
                    <p>Phone: {contactInfo.phone}</p>

                    <h5 className="text-lg font-semibold mt-3">Shipping Info:</h5>
                    <p>Name: {shippingInfo.name}</p>
                    <p>Address: {shippingInfo.address}</p>
                    <p>City: {shippingInfo.city}</p>

                    <dl className="row mb-0">
                      <dt className="col-6 text-sm">Total:</dt>
                      <dd className="col-6 text-end text-lg font-bold">${calculateTotal()}</dd>
                    </dl>
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer bg-light text-end">
              <button className="btn btn-primary w-100 py-2" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
