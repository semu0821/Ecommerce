import { useState, useEffect } from "react";

const OrdersView = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://modestserver.onrender.com/api/orders"); // Replace with your API URL
        const data = await response.json();
        setOrders(data); // Assuming `data` is an array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>; // Show a loading indicator
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>; // Show a message if no orders are found
  }

  return (
    <div className="container mb-3">
      <h4 className="my-3">Orders</h4>
      <div className="row g-3">
        {orders && orders.map((order) => (
          <div className="col-md-6" key={order._id}>
            <div className="card">
              <div className="card-header">
                <div className="small">
                  <span className="border bg-secondary rounded-left px-2 text-white">
                    Order ID
                  </span>
                  <span className="border bg-white rounded-right px-2 me-2">
                    #{order._id}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div className="small mb-2">
                  <span className="text-muted me-2">User ID:</span>
                  <span className="me-3">{order.user._id}</span>
                </div>
                <div className="small mb-2">
                  <span className="text-muted me-2">Total Price:</span>
                  <span className="me-3">${order.total_price.$numberDecimal}</span>
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
                <div className="small">
                  <span className="text-muted me-2">Updated At:</span>
                  <span>
                    {new Date(order.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersView;
