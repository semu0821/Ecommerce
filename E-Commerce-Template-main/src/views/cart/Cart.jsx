import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartView = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart data from localStorage and set it in the state
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, quantity);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.$numberDecimal) * item.quantity, 0).toFixed(2);
  };

  const prepareOrderData = () => {
    return {
      user: "",
      total_price: calculateTotal(),
      status: "Pending",
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: parseFloat(item.price.$numberDecimal),
      })),
    };
  };

  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>Quantity</th>
                      <th scope="col" width={150}>Price</th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <strong>Your cart is empty.</strong>
                        </td>
                      </tr>
                    ) : (
                      cart.map((item, index) => (
                        <tr key={item._id}>
                          <td>
                            <div className="row">
                              <div className="col-3 d-none d-md-block">
                                <img src={item.image_url} width="80" alt={item.name} />
                              </div>
                              <div className="col">
                                <Link to={`/product/detail/${item._id}`} className="text-decoration-none">
                                  {item.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="input-group input-group-sm mw-140">
                              <button
                                className="btn btn-primary text-white"
                                type="button"
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                              >
                                <i className="bi bi-dash-lg"></i>
                              </button>
                              <input
                                type="text"
                                className="form-control"
                                value={item.quantity}
                                readOnly
                              />
                              <button
                                className="btn btn-primary text-white"
                                type="button"
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                              >
                                <i className="bi bi-plus-lg"></i>
                              </button>
                            </div>
                          </td>
                          <td>
                            <var className="price">${(parseFloat(item.price.$numberDecimal) * item.quantity).toFixed(2)}</var>
                            <small className="d-block text-muted">
                              ${parseFloat(item.price.$numberDecimal).toFixed(2)} each
                            </small>
                          </td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(index)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link
                  to="/checkout"
                  state={prepareOrderData()}  // Pass the cart data directly to the checkout component
                  className="btn btn-primary float-end"
                >
                  Make Purchase <i className="bi bi-chevron-right"></i>
                </Link>
                <Link to="/" className="btn btn-secondary">
                  <i className="bi bi-chevron-left"></i> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <i className="bi bi-truck"></i> Free Delivery within 1-2 weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <dl className="row">
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-end h5">
                    <strong>${calculateTotal()}</strong>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
