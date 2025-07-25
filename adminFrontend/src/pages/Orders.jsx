import React, { useState } from 'react';
import { Package, Calendar, CreditCard, User, Hash, DollarSign, Check, MapPin } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Sarah Johnson",
      productName: "Wireless Headphones",
      quantity: 2,
      deliveryDate: "2025-07-28",
      totalAmount: 2999.99,
      paymentMethod: "Credit Card",
      address: "123 Oak Street, Downtown Area, Near Central Mall, Mumbai, Maharashtra 400001, India",
      isDelivered: false
    },
    {
      id: 2,
      customerName: "Michael Chen",
      productName: "Smart Watch",
      quantity: 1,
      deliveryDate: "2025-07-26",
      totalAmount: 15999.00,
      paymentMethod: "UPI",
      address: "456 Pine Avenue, Sector 5, Opposite Phoenix Mall, Wakad, Pune, Maharashtra 411057",
      isDelivered: false
    },
    {
      id: 3,
      customerName: "Emily Davis",
      productName: "Bluetooth Speaker",
      quantity: 3,
      deliveryDate: "2025-07-30",
      totalAmount: 4499.97,
      paymentMethod: "Debit Card",
      address: "789 Maple Road, Electronic City Phase 1, Near Infosys Campus, Bangalore, Karnataka 560100",
      isDelivered: true
    },
    {
      id: 4,
      customerName: "David Wilson",
      productName: "Laptop Stand",
      quantity: 1,
      deliveryDate: "2025-07-25",
      totalAmount: 1299.00,
      paymentMethod: "Cash on Delivery",
      address: "321 Cedar Lane, Cyber Hub, DLF Phase 3, Near Metro Station, Gurgaon, Haryana 122002",
      isDelivered: false
    },
    {
      id: 5,
      customerName: "Lisa Anderson",
      productName: "Phone Case Set",
      quantity: 5,
      deliveryDate: "2025-08-02",
      totalAmount: 999.95,
      paymentMethod: "Digital Wallet",
      address: "654 Birch Street, HITEC City, Financial District, Near Cyber Towers, Hyderabad, Telangana 500081",
      isDelivered: false
    },
    {
      id: 6,
      customerName: "James Brown",
      productName: "Wireless Charger",
      quantity: 2,
      deliveryDate: "2025-07-27",
      totalAmount: 1799.98,
      paymentMethod: "Credit Card",
      address: "987 Elm Drive, IT Corridor, Old Mahabalipuram Road, Near Sholinganallur, Chennai, Tamil Nadu 600113",
      isDelivered: false
    }
  ]);

  const handleMarkDelivered = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, isDelivered: true }
          : order
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="p-6">
        {/* Page Header */}
        <div className="text-center rounded-4xl bg-gradient-to-r from-slate-800 to-slate-900 p-4 shadow-lg mb-6"> 
          <h1 className="text-5xl font-bold text-white">Your Orders !!</h1>
          <p className="text-slate-300 text-sm">Track and manage customer orders</p>
        </div>

        {/* Orders List - Single Column with 50% Width Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id}>
                <div className='w-full h-2'></div>
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
                        <span className="text-white text-sm font-medium">Order #{order.id}</span>
                      </div>
                    </div>
                    {order.isDelivered && (
                      <div className="px-3 py-1 bg-green-100 border border-green-300 rounded-full">
                        <span className="text-green-700 text-sm font-semibold">✓ Delivered</span>
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
                          <p className="text-slate-600 text-xs font-medium">Customer</p>
                          <p className="text-slate-800 font-semibold text-sm break-words">{order.customerName}</p>
                        </div>
                      </div>

                      {/* Product Name */}
                      <div className="flex items-start gap-2">
                        <Package className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-slate-600 text-xs font-medium">Product</p>
                          <p className="text-slate-800 font-semibold text-sm break-words">{order.productName}</p>
                        </div>
                      </div>

                      {/* Delivery Address - Enhanced Wrapping */}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <p className="text-slate-600 text-xs font-medium">Delivery Address</p>
                          <p className="text-slate-800 font-semibold text-sm leading-relaxed break-words hyphens-auto overflow-wrap-anywhere">
                            {order.address}
                          </p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-start gap-2">
                        <Hash className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-slate-600 text-xs font-medium">Quantity</p>
                          <p className="text-slate-800 font-semibold text-sm">{order.quantity} units</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                      {/* Delivery Date */}
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-slate-600 text-xs font-medium">Delivery Date</p>
                          <p className="text-slate-800 font-semibold text-sm">{formatDate(order.deliveryDate)}</p>
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-slate-600 text-xs font-medium">Total Amount</p>
                          <p className="text-slate-800 font-semibold text-lg">{formatAmount(order.totalAmount)}</p>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-start gap-2">
                        <CreditCard className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-slate-600 text-xs font-medium">Payment Method</p>
                          <p className="text-slate-800 font-semibold text-sm break-words">{order.paymentMethod}</p>
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
              <h3 className="text-lg font-semibold text-gray-600 mb-1">No orders found</h3>
              <p className="text-gray-500 text-sm">Orders will appear here when customers place them.</p>
            </div>
          )}
        </div>

        {/* Order Summary Stats */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Total Orders</h3>
              <p className="text-2xl font-bold text-slate-800">{orders.length}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Delivered</h3>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(order => order.isDelivered).length}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Pending</h3>
              <p className="text-2xl font-bold text-orange-600">
                {orders.filter(order => !order.isDelivered).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;