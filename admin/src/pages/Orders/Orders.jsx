import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../config/serverURL";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${SERVER_URL}/api/v1/order/all-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to load orders.");
        setError("Failed to load orders");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${SERVER_URL}/api/v1/order/update-status`,
        { orderId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        toast.success("Order status updated");
      } else {
        toast.error("Failed to update order status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Orders</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm font-mono text-gray-700">
                    {order._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {order.userId?.name || "N/A"} <br />
                    <span className="text-xs text-gray-500">
                      {order.userId?.email || ""}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{order.items.length}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-green-600">
                    ₹{order.amount}
                  </td>
                  <td className="py-3 px-4">
                    {order.payment ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Paid
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="text-sm border border-gray-300 rounded px-2 py-1 bg-white shadow-sm"
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
