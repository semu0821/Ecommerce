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
  console.log(user)
  const [contactInfo, setContactInfo] = useState({
    email: user?.user?.email || "",
    phone: user?.user?.phone_number || "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.user?.name || "",
    address: "",
    city: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(null);  // State to manage success/error messages
  const navigate = useNavigate();  // Use navigate for redirection

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productId = orderData.items[0].product;
        const response = await axios.get(`https://modestserver.onrender.com/api/products/${productId}`);
        const productData = response.data;

        productData.price = Number(productData.price.$numberDecimal);
        productData.discount = Number(productData.discount.$numberDecimal);

        setProductDetails(productData);
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
      (total, item) => total + item.price * item.quantity, 0
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


  // const handlePlaceOrder = async () => {

  //   const orderSummary = {
  //     user: {
  //       id: user.user._id,
  //       email: contactInfo.email,
  //       phone: contactInfo.phone,
  //       name: shippingInfo.name,
  //     },
  //     shippingInfo: {
  //       address: shippingInfo.address,
  //       city: shippingInfo.city,
  //     },
  //     items: orderData.items.map(item => ({
  //       product: item.product,
  //       quantity: item.quantity,
  //       price: productDetails?.price,
  //     })),
  //     total_price: calculateTotal(),
  //     status: 'pending',
  //   };

  //   try {
  //     const response = await axios.post('https://modestserver.onrender.com/api/orders', orderSummary);

  //     if (response.status === 201) {
  //       console.log("Order placed successfully:", response.data);
  //       setOrderSuccess('Order placed successfully!');  // Set success message
  //       setTimeout(() => {
  //         // Redirect to order confirmation or dashboard after a few seconds
  //         navigate('/invoice');  // Redirect to /invoice route
  //       }, 2000); // Redirect after 2 seconds for a smoother experience
  //     } else {
  //       console.log("Failed to place order:", response.data);
  //       setOrderSuccess('Failed to place the order. Please try again.');  // Set error message
  //     }
  //   } catch (error) {
  //     console.error("Error placing order:", error.message);
  //     setOrderSuccess('Error placing order. Please try again.');  // Set error message
  //   }
  // };
  const handlePlaceOrder = async () => {
    const orderSummary = {
      user: {
        id: user.user._id,
        email: contactInfo.email,
        phone: contactInfo.phone,
        name: shippingInfo.name,
      },
      shippingInfo: {
        address: shippingInfo.address,
        city: shippingInfo.city,
      },
      items: orderData.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: productDetails?.price,
      })),
      total_price: calculateTotal(),
      status: 'pending',
    };
  
    try {
      // Step 1: Register the order
      const orderResponse = await axios.post('https://modestserver.onrender.com/api/orders', orderSummary);
  
      if (orderResponse.status === 201) {
        console.log("Order registered successfully:", orderResponse.data);
        const orderId = orderResponse.data.id; // Get the order ID from the response
      const {order} = orderResponse.data
        // Step 2: Proceed to payment
        const paymentResponse = await axios.post('https://modestserver.onrender.com/api/pay', { orderSummary });
  
        if (paymentResponse.status === 200) {
          const checkoutUrl = paymentResponse.data.checkout_url;
          window.location.href = checkoutUrl; // Redirect to the payment gateway
  
          // After payment verification
          setOrderSuccess('Order placed and payment verified successfully!');
          const updatedOrderSummary = {
            ...orderSummary,
            invoice_number: order.invoice_number,
          };
       
  
          localStorage.removeItem('cart');
          localStorage.setItem("invoice", JSON.stringify(updatedOrderSummary ));
          // Ensure that the navigation to the invoice page works
          // console.log("Navigating to Invoice page...");
          // navigate("/invoice", { state: orderData }); 
          // // Immediate navigation
          // navigate("/invoice", { state: orderSummary });

          // localStorage.removeItem('cart');
  
        } else {
          console.log("Payment verification failed:", paymentResponse.data);
          setOrderSuccess('Payment verification failed. Please try again.');
        }
      } else {
        console.log("Order registration failed:", orderResponse.data);
        setOrderSuccess('Failed to register order. Please try again.');
      }
    } catch (error) {
      console.error("Error during process:", error.message);
      setOrderSuccess('An error occurred. Please try again.');
    }
  };
  
  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Checkout</h1>
      </div>
      {orderSuccess && <div className="alert">{orderSuccess}</div>}

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
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      className="form-control"
                      placeholder="Address"
                      required
                      onChange={handleShippingChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="city"
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
                      {orderData.items.map((item, index) => (
                        <tr key={index}>
                          <td>{productDetails?.name}</td>
                          <td>${productDetails?.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(productDetails?.price * item.quantity).toFixed(2)}</td>
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
              <button className="btn btn-primary w-100 py-2" onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;