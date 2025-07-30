import React, { useState } from "react";
import toast from "react-hot-toast"
import {
  Package,
  Calendar,
  CreditCard,
  User,
  Hash,
  DollarSign,
  Check,
  MapPin,
} from "lucide-react";
import axios from "../api/axios.config.js";
import { useEffect } from "react";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const asyncHandler = async () => {
      try {
        const response = await axios.get("/order/view");
        setOrders(response.data.data);
        toast.success(response.data.message)
        
      } catch (err) {
        toast.error(err.response.data.message)
      }
     
    };

     asyncHandler();
  }, []);

  const handleMarkDelivered = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, isDelivered: true } : order
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return `₹${amount?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="p-6">
        {/* Page Header */}
        <div className="text-center rounded-4xl bg-gradient-to-r from-slate-800 to-slate-900 p-4 shadow-lg mb-6">
          <h1 className="text-5xl font-bold text-white">Your Orders</h1>
          <p className="text-slate-300 text-sm">
            Track and manage customer orders
          </p>
        </div>

        {/* Orders List - Single Column with 50% Width Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id}>
                <div className="w-full h-2"></div>
                <div
                  // Default for screens < 1000px: w-3/4 (75%)
                  // For screens >= 1000px (xl_custom breakpoint): w-1/2 (50%)
                  className="xl_custom:w-1/2 mx-auto bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-slate-200"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">
                          Order Id:{order._id}
                        </span>
                      </div>
                    </div>
                    {order.isDelivered && (
                      <div className="px-3 py-1 bg-green-100 border border-green-300 rounded-full">
                        <span className="text-green-700 text-sm font-semibold">
                          ✓ Delivered
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Order Details - Horizontal Layout */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Left Column */}
                    <div className="space-y-3">
                      {/* Customer Name */}
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-slate-600 text-xs font-medium">
                            Customer
                          </p>
                          <p className="text-slate-800 font-semibold text-sm break-words">
                            {order.fullName}
                          </p>
                        </div>
                      </div>

                      {/* Product Name */}
                      <div className="flex items-start gap-2">
                        <Package className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-slate-600 text-xs font-medium">
                            Product
                          </p>
                          <p className="text-slate-800 font-semibold text-sm break-words">
                            {order?.productDetails?.name}
                          </p>
                        </div>
                      </div>

                      {/* Delivery Address - Enhanced Wrapping */}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <p className="text-slate-600 text-xs font-medium">
                            Delivery Address
                          </p>
                          <p className="text-slate-800 font-semibold text-sm leading-relaxed break-words hyphens-auto overflow-wrap-anywhere">
                            {order.address}
                          </p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-start gap-2">
                        <Hash className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-slate-600 text-xs font-medium">
                            Quantity
                          </p>
                          <p className="text-slate-800 font-semibold text-sm">
                            {order.orderQty} units
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                      {/* Delivery Date */}
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-slate-600 text-xs font-medium">
                            Delivery Date
                          </p>
                          <p className="text-slate-800 font-semibold text-sm">
                            {formatDate(order.deliveryDate)}
                          </p>
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-slate-600 text-xs font-medium">
                            Total Amount
                          </p>
                          <p className="text-slate-800 font-semibold text-lg">
                            {formatAmount(order?.totalAmount)}
                          </p>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-start gap-2">
                        <CreditCard className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-slate-600 text-xs font-medium">
                            Payment Method
                          </p>
                          <p className="text-slate-800 font-semibold text-sm break-words">
                            {order.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivered Button */}
                  <div className="pt-3 border-t border-slate-200">
                    {!order.isDelivered ? (
                      <button
                        onClick={() => handleMarkDelivered(order.id)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <Check className="w-4 h-4" />
                        Mark as Delivered
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-lg border border-green-300 cursor-not-allowed"
                      >
                        <Check className="w-4 h-4" />
                        Order Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-600 mb-1">
                No orders found
              </h3>
              <p className="text-gray-500 text-sm">
                Orders will appear here when customers place them.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary Stats */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Total Orders
              </h3>
              <p className="text-2xl font-bold text-slate-800">
                {orders.length}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Delivered
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter((order) => order.isDelivered).length}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Pending
              </h3>
              <p className="text-2xl font-bold text-orange-600">
                {orders.filter((order) => !order.isDelivered).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
