import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ViewShops() {
  const navigate=useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      image:
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop&crop=center",
      Address:
        "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features 6.7-inch Super Retina XDR display with ProMotion technology.",
      quantity: 25,
      price: 134900,
      discountPercentage: 8,
      deliveryTime: 2,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop&crop=center",
      Address:
        "Premium Android smartphone with S Pen, 200MP camera, and AI-powered features. Built with titanium frame for durability and premium feel.",
      quantity: 18,
      price: 129999,
      discountPercentage: 12,
      deliveryTime: 3,
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop&crop=center",
      Address:
        "Industry-leading noise canceling wireless headphones with 30-hour battery life. Premium comfort and exceptional sound quality for audiophiles.",
      quantity: 42,
      price: 29990,
      discountPercentage: 15,
      deliveryTime: 1,
    },
    {
      id: 4,
      name: "MacBook Air M3",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop&crop=center",
      Address:
        "Ultra-thin and lightweight laptop powered by Apple M3 chip. Features 13.6-inch Liquid Retina display and all-day battery life for productivity.",
      quantity: 12,
      price: 114900,
      discountPercentage: 5,
      deliveryTime: 4,
    },
    {
      id: 5,
      name: "Dell XPS 13 Plus",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&crop=center",
      Address:
        "Premium ultrabook with 12th Gen Intel processors and stunning InfinityEdge display. Perfect blend of performance and portability for professionals.",
      quantity: 8,
      price: 149999,
      discountPercentage: 18,
      deliveryTime: 5,
    },
    {
      id: 6,
      name: "iPad Pro 12.9-inch",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&crop=center",
      Address:
        "Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support. Perfect for creative professionals and digital artists.",
      quantity: 15,
      price: 112900,
      discountPercentage: 10,
      deliveryTime: 3,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  const handleEdit = (shopId) => {
    navigate(`/viewShops/${shopId}`);
  };

  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-2 sm:p-3">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 sm:py-8 rounded-2xl sm:rounded-4xl">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <h1 className="text-4xl sm:text-3xl font-bold text-center">
            Shop Details
          </h1>
          <p className="text-slate-300 text-center mt-2 text-sm sm:text-base">
            Manage and view all available products ({products.length} items)
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="w-full sm:w-2/3 lg:w-1/2 mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 sm:pl-10 sm:pr-10 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors text-slate-700 placeholder-slate-400 text-sm sm:text-base"
              placeholder="Search shops by name "
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-slate-600 transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="mt-2 text-xs sm:text-sm text-slate-600">
              {filteredProducts.length === 0 ? (
                <span className="text-red-600">
                  No products found matching "{searchTerm}"
                </span>
              ) : (
                <span>
                  Found {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} matching "
                  {searchTerm}"
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">
              {searchTerm ? "🔍" : "📦"}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
              {searchTerm ? "No products found" : "No products available"}
            </h3>
            <p className="text-slate-500 text-sm sm:text-base">
              {searchTerm
                ? `No products match your search for ${searchTerm}. Try a different search term.`
                : "Start by adding your first product to the inventory"}
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="mt-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 sm:px-6 rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 xl_custom:w-3/5 xl2_custom:w-full   m-auto ">
            {filteredProducts.map((product) => (
              <div>
                <div
                  key={product.id}
                  className="bg-white shadow-lg rounded-lg border border-slate-200 overflow-hidden "
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-3 sm:px-6 sm:py-4">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {product.name}
                    </h2>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6">
                    <div className="xl2_custom:flex lg:flex-row gap-4 sm:gap-6 ">
                      {/* Left Side - Product Image */}
                      <div className="flex-shrink-0 w-48 sm:w-56 lg:w-64 m-auto">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center";
                          }}
                        />
                      </div>

                      {/* Right Side - Product Details (Vertical List) */}
                      <div className="flex-1 space-y-2.5 sm:space-y-3 font-sans">
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5 sm:mb-2">
                            Address:
                          </h3>
                          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                            {product.Address}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">
                            Owner Name:
                          </h3>
                          <p className="text-base sm:text-lg font-medium text-slate-800">
                            {product.quantity} units
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">
                            Address Link:
                          </h3>
                          <p className="text-base sm:text-lg font-medium text-slate-800">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">
                            Phone Number:
                          </h3>
                          <p className="text-base sm:text-lg font-medium ">
                            {product.discountPercentage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom - Action Buttons */}
                    <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 sm:px-6 rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 sm:px-6 rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-4 w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Statistics */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">
              {searchTerm ? "Search Results Summary" : "Inventory Summary"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {filteredProducts.length}
                </div>
                <div className="text-slate-300 text-xs sm:text-sm">
                  {searchTerm ? "Matching Products" : "Total Products"}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {filteredProducts.reduce((sum, p) => sum + p.quantity, 0)}
                </div>
                <div className="text-slate-300 text-xs sm:text-sm">
                  Total Units
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {formatPrice(
                    Math.min(
                      ...filteredProducts.map((p) =>
                        calculateDiscountedPrice(p.price, p.discountPercentage)
                      )
                    )
                  )}
                </div>
                <div className="text-slate-300 text-xs sm:text-sm">
                  Lowest Price
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {formatPrice(
                    Math.max(
                      ...filteredProducts.map((p) =>
                        calculateDiscountedPrice(p.price, p.discountPercentage)
                      )
                    )
                  )}
                </div>
                <div className="text-slate-300 text-xs sm:text-sm">
                  Highest Price
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



