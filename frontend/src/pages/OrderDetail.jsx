// src/pages/OrderDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  Box,
  Info,
  Phone,
  Mail,
} from "lucide-react";
import axios from "axios";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [shipping, setShipping] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      // Fetch order
      const orderRes = await axios.get(
        `http://localhost:8080/api/orders?id=${orderId}`
      );
      const orderData = Array.isArray(orderRes.data)
        ? orderRes.data[0]
        : orderRes.data;
      setOrder(orderData);

      // Fetch order items
      const itemsRes = await axios.get(
        `http://localhost:8080/api/order-items/order?order_id=${orderId}`
      );
      setOrderItems(Array.isArray(itemsRes.data) ? itemsRes.data : []);

      // Fetch shipping info
      try {
        const shippingRes = await axios.get(
          `http://localhost:8080/api/shipping/order?order_id=${orderId}`
        );
        setShipping(shippingRes.data);
      } catch (err) {
        console.log("No shipping info found");
      }

      // Fetch payment info
      try {
        const paymentRes = await axios.get(
          `http://localhost:8080/api/payment/order?order_id=${orderId}`
        );
        setPayment(paymentRes.data);
      } catch (err) {
        console.log("No payment info found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Unable to load order details"}
          </p>
          <Link
            to="/profile?tab=orders"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/profile?tab=orders")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Orders</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #{order.id}
              </h1>
              <p className="text-gray-600 mt-1">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status || "Pending"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Box className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
              </div>

              <div className="space-y-4">
                {orderItems.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    No items found
                  </p>
                ) : (
                  orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                      <img
                        src={
                          item.image_url || "https://via.placeholder.com/100"
                        }
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.product_name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            ${item.price} each
                          </span>
                          <span className="text-lg font-bold text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Shipping Information */}
            {shipping && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="text-blue-600" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Delivery Address
                      </p>
                      <p className="text-gray-600">
                        {shipping.shipping_address}
                      </p>
                      <p className="text-gray-600">
                        {shipping.city}, {shipping.postal_code}
                      </p>
                      <p className="text-gray-600">{shipping.country}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Shipping Method</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {shipping.shipping_method}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tracking Number</p>
                      <p className="font-semibold text-gray-900">
                        {shipping.tracking_number}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Shipped Date</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(shipping.shipping_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected Delivery</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(shipping.delivery_date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {payment && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-blue-600" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Information
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {payment.payment_method?.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        payment.payment_status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.payment_status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-semibold text-gray-900">
                      {payment.transaction_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Date</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(payment.payment_date)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    $
                    {order.total_amount
                      ? (order.total_amount / 1.1).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>
                    $
                    {order.total_amount
                      ? ((order.total_amount * 0.1) / 1.1).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-blue-600">
                      ${order.total_amount || "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(order.created_at)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Package className="text-gray-400" size={16} />
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium text-gray-900">#{order.id}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Link
                  to="/catalog"
                  className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-center font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-blue-600" size={24} />
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Have questions about your order? Contact our support team.
              </p>
              <div className="space-y-2 text-sm">
                <a
                  href="mailto:support@n9ne.com"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Mail size={16} />
                  support@n9ne.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Phone size={16} />
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
