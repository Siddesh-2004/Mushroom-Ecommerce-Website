import React, { useState } from 'react';
import { Package, Clock, MapPin, Phone, User, DollarSign, Calendar, CheckCircle } from 'lucide-react';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+91 98765-43210",
      address: "123 Main St, Apartment 4B",
      pincode: "12345",
      totalAmount: 24999.17,
      items: [
        { name: "Pizza Margherita", quantity: 2 },
        { name: "Garlic Bread", quantity: 1 },
        { name: "Coke", quantity: 3 }
      ],
      date: "2024-07-18",
      time: "10:30 AM",
      timestamp: new Date("2024-07-18T10:30:00"),
      deliveryStatus: "pending"
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+91 98765-43211",
      address: "456 Oak Avenue, Suite 2A",
      pincode: "12346",
      totalAmount: 12125.75,
      items: [
        { name: "Burger Deluxe", quantity: 1 },
        { name: "Fries", quantity: 2 },
        { name: "Milkshake", quantity: 1 }
      ],
      date: "2024-07-18",
      time: "11:15 AM",
      timestamp: new Date("2024-07-18T11:15:00"),
      deliveryStatus: "pending"
    },
    {
      id: 3,
      name: "Mike Johnson",
      phone: "+91 98765-43212",
      address: "789 Pine Road, House 15",
      pincode: "12347",
      totalAmount: 7439.63,
      items: [
        { name: "Chicken Salad", quantity: 1 },
        { name: "Soup", quantity: 2 }
      ],
      date: "2024-07-18",
      time: "09:45 AM",
      timestamp: new Date("2024-07-18T09:45:00"),
      deliveryStatus: "delivered"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      phone: "+91 98765-43213",
      address: "321 Elm Street, Floor 3",
      pincode: "12348",
      totalAmount: 35489.13,
      items: [
        { name: "Pasta Carbonara", quantity: 1 },
        { name: "Caesar Salad", quantity: 1 },
        { name: "Tiramisu", quantity: 2 },
        { name: "Wine", quantity: 1 }
      ],
      date: "2024-07-18",
      time: "12:00 PM",
      timestamp: new Date("2024-07-18T12:00:00"),
      deliveryStatus: "pending"
    },
    {
      id: 5,
      name: "Robert Brown",
      phone: "+91 98765-43214",
      address: "654 Maple Drive, Unit 7",
      pincode: "12349",
      totalAmount: 5651.40,
      items: [
        { name: "Sandwich", quantity: 2 },
        { name: "Chips", quantity: 1 }
      ],
      date: "2024-07-18",
      time: "08:30 AM",
      timestamp: new Date("2024-07-18T08:30:00"),
      deliveryStatus: "delivered"
    }
  ]);

  const toggleDeliveryStatus = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, deliveryStatus: order.deliveryStatus === 'pending' ? 'delivered' : 'pending' }
          : order
      )
    );
  };

  // Sort orders: pending orders first (sorted by timestamp), then delivered orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.deliveryStatus === 'pending' && b.deliveryStatus === 'delivered') return -1;
    if (a.deliveryStatus === 'delivered' && b.deliveryStatus === 'pending') return 1;
    return a.timestamp - b.timestamp;
  });

  const pendingCount = orders.filter(order => order.deliveryStatus === 'pending').length;
  const deliveredCount = orders.filter(order => order.deliveryStatus === 'delivered').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 p-6">
          <h1 className="text-3xl font-bold text-gray-900 ">Order Management</h1>
          <div className="flex gap-4 text-sm">
            <div className="bg-red-100 text-blue-800 px-3 py-1 rounded-full ">
              Pending: {pendingCount}
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full ">
              Delivered: {deliveredCount}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-8 ">
          {sortedOrders.map((order) => (
            <div style={{margin:"10px"}}
              key={order.id} 
              className={` bg-white rounded-xl shadow-lg p-8 border-l-4 transition-all duration-300 ${
                order.deliveryStatus === 'pending' 
                  ? 'border-l-red-500 hover:shadow-xl' 
                  : 'border-l-green-500 opacity-75'
              }`}
            >
              <div  className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
                {/* Order Info */}
                <div className="flex-1 space-y-6">
                  {/* Customer Details */}
                  <div className="space-y-4">
                    <div className="text-lg">
                      <span className="font-semibold text-gray-900">Name: </span>
                      <span className="text-gray-800">{order.name}</span>
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold text-gray-900">Phone: </span>
                      <span className="text-gray-800">{order.phone}</span>
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold text-gray-900">Address: </span>
                      <span className="text-gray-800">{order.address}</span>
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold text-gray-900">Pincode: </span>
                      <span className="text-gray-800">{order.pincode}</span>
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold text-gray-900">Total Amount: </span>
                      <span className="text-green-600 font-bold">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-3">Items:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {order.items.map((item, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-50 text-gray-700 text-base px-4 py-3 rounded-lg border"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">(Qty: {item.quantity})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="text-lg">
                      <span className="font-semibold text-gray-900">Date: </span>
                      <span className="text-gray-800">{order.date}</span>
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold text-gray-900">Time: </span>
                      <span className="text-gray-800">{order.time}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Status Button */}
                <div className="flex flex-col items-end gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-2">Order ID: #{order.id}</div>
                    <button
                      onClick={() => toggleDeliveryStatus(order.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-lg ${
                        order.deliveryStatus === 'pending'
                          ? 'bg-red-500 hover:bg-red-700 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {order.deliveryStatus === 'pending' ? (
                        <>
                          <Clock className="h-5 w-5" />
                          Mark Delivered
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          Delivered
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Orders will appear here when customers place them.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;