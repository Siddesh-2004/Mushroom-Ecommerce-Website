import React, { useState, useEffect } from 'react';
import {
  Package,
  Clock,
  MapPin,
  Phone,
  User,
  DollarSign,
  Calendar,
  CheckCircle,
  Trash2,
  TreePine,
  Leaf,
  CreditCard,
  Wallet
} from 'lucide-react';

const OrdersPage = () => {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('pending');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);
  }, []);

  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+91 98765-43210",
      address: "123 Main St, Apartment 4B",
      pincode: "12345",
      totalAmount: 24999.17,
      paymentMode: "online",
      items: [
        { name: "Premium Shiitake Mushrooms", quantity: 2 },
        { name: "Fresh Oyster Mushrooms", quantity: 1 },
        { name: "Button Mushrooms", quantity: 3 }
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
      paymentMode: "cash",
      items: [
        { name: "King Oyster Mushrooms", quantity: 1 },
        { name: "Enoki Mushrooms", quantity: 2 },
        { name: "Portobello Mushrooms", quantity: 1 }
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
      paymentMode: "online",
      items: [
        { name: "Cremini Mushrooms", quantity: 1 },
        { name: "Lion's Mane Mushrooms", quantity: 2 }
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
      paymentMode: "cash",
      items: [
        { name: "Mixed Mushroom Pack", quantity: 1 },
        { name: "Dried Shiitake", quantity: 1 },
        { name: "Mushroom Growing Kit", quantity: 2 },
        { name: "Organic Button Mushrooms", quantity: 1 }
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
      paymentMode: "online",
      items: [
        { name: "White Button Mushrooms", quantity: 2 },
        { name: "Mushroom Spores", quantity: 1 }
      ],
      date: "2024-07-18",
      time: "08:30 AM",
      timestamp: new Date("2024-07-18T08:30:00"),
      deliveryStatus: "delivered"
    },
    {
      id: 6,
      name: "Emily Davis",
      phone: "+91 98765-43215",
      address: "987 Cedar Lane, Block A",
      pincode: "12350",
      totalAmount: 8945.25,
      paymentMode: "cash",
      items: [
        { name: "Maitake Mushrooms", quantity: 1 },
        { name: "Chanterelle Mushrooms", quantity: 1 }
      ],
      date: "2024-07-18",
      time: "02:15 PM",
      timestamp: new Date("2024-07-18T14:15:00"),
      deliveryStatus: "delivered"
    },
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

  const deleteDeliveredOrder = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.filter(order => order.id !== orderId)
    );
  };

  const filteredOrders = orders
    .filter(order => order.deliveryStatus === filter)
    .sort((a, b) => a.timestamp - b.timestamp);

  const pendingCount = orders.filter(order => order.deliveryStatus === 'pending').length;
  const deliveredCount = orders.filter(order => order.deliveryStatus === 'delivered').length;

  const getPaymentIcon = (paymentMode) => {
    return paymentMode === 'online' ? CreditCard : Wallet;
  };

  const getPaymentModeText = (paymentMode) => {
    return paymentMode === 'online' ? 'Online Payment' : 'Cash on Delivery';
  };

  const getPaymentModeColor = (paymentMode) => {
    return paymentMode === 'online' 
      ? 'bg-blue-500/20 text-blue-200 border-blue-300/30' 
      : 'bg-amber-500/20 text-amber-200 border-amber-300/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 relative overflow-hidden p-6">
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-green-300 opacity-20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
      {/* Decorations */}
      <TreePine className="absolute top-10 left-10 text-green-400 w-8 h-8 opacity-40 animate-bounce" />
      <Leaf className="absolute bottom-10 right-10 text-emerald-400 w-6 h-6 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />

      <div className={`max-w-7xl mx-auto transition-all duration-700 ${mounted ? 'animate-slideInUp' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🍄 Mushroom Orders Management</h1>
          <p className="text-emerald-200 mb-6">Fresh & Premium Mushroom Deliveries</p>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setFilter('pending')}
              className={`px-5 py-2 rounded-full font-medium ${filter === 'pending' ? 'bg-green-600 text-white' : 'bg-white/20 text-white'} transition`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`px-5 py-2 rounded-full font-medium ${filter === 'delivered' ? 'bg-green-600 text-white' : 'bg-white/20 text-white'} transition`}
            >
              Delivered ({deliveredCount})
            </button>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-6 ">
          {filteredOrders.map(order => {
            const PaymentIcon = getPaymentIcon(order.paymentMode);
            return (
              <div
                key={order.id}
                className=" bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:bg-white/15 hover:shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  {/* Order Info */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-white/90 text-sm font-medium">
                        🍄 Order ID: #{order.id}
                      </div>
                      <div className="flex gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentModeColor(order.paymentMode)}`}>
                          {getPaymentModeText(order.paymentMode)}
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-medium ${order.deliveryStatus === 'pending'
                          ? 'bg-orange-500/20 text-orange-100 border border-orange-300/30'
                          : 'bg-green-500/20 text-green-100 border border-green-300/30'
                          }`}>
                          {order.deliveryStatus === 'pending' ? 'Pending' : 'Delivered'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-emerald-300" />
                          <div>
                            <span className="text-white/70 text-sm font-medium">Customer</span>
                            <div className="text-white font-semibold">{order.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-emerald-300" />
                          <div>
                            <span className="text-white/70 text-sm font-medium">Phone</span>
                            <div className="text-white font-semibold">{order.phone}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-emerald-300 mt-1" />
                          <div>
                            <span className="text-white/70 text-sm font-medium">Delivery Address</span>
                            <div className="text-white font-semibold">{order.address}</div>
                            <div className="text-white/80 text-sm">PIN: {order.pincode}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-emerald-300" />
                          <div>
                            <span className="text-white/70 text-sm font-medium">Total Amount</span>
                            <div className="text-emerald-300 font-bold text-lg">₹{order.totalAmount.toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <PaymentIcon className="h-5 w-5 text-emerald-300" />
                          <div>
                            <span className="text-white/70 text-sm font-medium">Payment Mode</span>
                            <div className="text-white font-semibold">{getPaymentModeText(order.paymentMode)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Package className="h-5 w-5 text-emerald-300" />
                        <span className="text-white font-semibold text-lg">Mushroom Items Ordered</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl">
                            <span className="font-medium">🍄 {item.name}</span>
                            <span className="text-white/70 ml-2">(Qty: {item.quantity})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-emerald-300" />
                        <div>
                          <span className="text-white/70 text-sm font-medium">Order Date</span>
                          <div className="text-white font-semibold">{order.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-emerald-300" />
                        <div>
                          <span className="text-white/70 text-sm font-medium">Order Time</span>
                          <div className="text-white font-semibold">{order.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => toggleDeliveryStatus(order.id)}
                      className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 ${order.deliveryStatus === 'pending'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
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
                          Mark Pending
                        </>
                      )}
                    </button>

                    {filter === 'delivered' && (
                      <button
                        onClick={() => deleteDeliveredOrder(order.id)}
                        className="flex items-center gap-2 text-sm text-red-300 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">🍄</div>
              <h3 className="text-xl font-medium text-white mb-3">No {filter} mushroom orders</h3>
              <p className="text-white/70">Fresh mushroom orders will appear here when customers place them.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-slideInUp {
          animation: slideInUp 0.7s ease-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OrdersPage;