
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const OrdersView = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [statusFilter, setStatusFilter] = useState("all"); // Status filter
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [orderItems, setOrderItems] = useState([]); // State to store order items
  const [loadingItems, setLoadingItems] = useState(false); // Loading state for items
  const { user } = useContext(AuthContext);
console.log(user)
  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://modestserver.onrender.com/api/orders/user/${user?._id}`
        );
        const data = await response.json();
        const sortedOrders = data.sort((a, b) =>
          a.status === "pending" ? -1 : 1
        );
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders); // Initialize filtered orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filterOrders = () => {
      let filtered = orders;

      // Filter by status
      if (statusFilter !== "all") {
        filtered = filtered.filter((order) => order.status === statusFilter);
      }

      // Filter by search term (invoice number)
      if (searchTerm) {
        filtered = filtered.filter(
          (order) =>
            order.invoice_number &&
            order.invoice_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredOrders(filtered);
    };

    filterOrders();
  }, [searchTerm, statusFilter, orders]);


  const fetchOrderItems = async (order) => {
    console.log("order")
    try {
      setLoadingItems(true);
      const items = await Promise.all(
        order.orderItems.map(async (item) => {
          const response = await fetch(
            `https://modestserver.onrender.com/api/products/${item.product}`
          );

          const productData = await response.json();
          return { ...item, productData };
        })
      );
      setOrderItems(items);
      setSelectedOrder(order);
    } catch (error) {
      console.error("Error fetching order items:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setOrderItems([]);
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="container mb-3">
      <h4 className="my-3">Orders</h4>

      {/* Search and Filter Controls */}
      <div className="mb-3">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Invoice Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
          
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="row g-3">
        {filteredOrders.map((order) => (
          <div className="col-md-6" key={order._id}>
            <div className="card">
              <div className="card-header">
                <div className="small">
                  <span className="border bg-secondary rounded-left px-2 text-white">
                    Invoice Number:
                  </span>
                  <span className="border bg-white rounded-right px-2 me-2">
                    #{order.invoice_number}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div className="small mb-2">
                  <span className="text-muted me-2">Total Price:</span>
                  <span className="me-3">
                    ${order.total_price.$numberDecimal}
                  </span>
                </div>
                <div className="small mb-2">
                  <span className="text-muted me-2">Status:</span>
                  <span
                    className={
                      order.status === "Completed"
                        ? "text-success"
                        : order.status === "Processing"
                          ? "text-primary"
                          : order.status === "Pending"
                            ? "text-warning"
                            : "text-danger"
                    }
                  >
                    {order.status}
                  </span>
                </div>
                <div className="small">
                  <span className="text-muted me-2">Created At:</span>
                  <span className="me-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => fetchOrderItems(order)}
                >
                  Show Items
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Order Items */}
      {selectedOrder && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Items in Order #{selectedOrder._id}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {loadingItems ? (
                  <div>Loading items...</div>
                ) : (
                  <ul className="list-group">
                    {orderItems.map((item) => (
                      <li className="list-group-item" key={item._id}>
                        <div>
                          <strong>Product:</strong> {item.productData.name}
                        </div>
                        <div>
                          <strong>Price:</strong> $
                          {item.productData.price.$numberDecimal}
                        </div>
                        <div>
                          <strong>Quantity:</strong> {item.quantity}
                        </div>
                        <div>
                          <strong>Total:</strong> $
                          {(
                            item.quantity *
                            parseFloat(item.productData.price.$numberDecimal)
                          ).toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersView;