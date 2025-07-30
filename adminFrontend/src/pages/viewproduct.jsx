import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios.config';
import toast from "react-hot-toast"
export default function ViewProducts() {
  const navigate =useNavigate()
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    const asyncHandler=async()=>{
      try{
        const response = await axios.get('/product/view');
        setProducts(response.data.data);

      }catch(err){
        console.log(err);
      }
    }
    asyncHandler()
  },[])

  const [searchTerm, setSearchTerm] = useState('');

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage / 100);
  };

  const handleEdit = (productId) => {
    navigate(`/viewProducts/${productId}`)
    
  };

  const handleDelete = async(id) => {
    try{
      console.log(id);
      const response=await axios.delete(`/product/delete/${id}`)
      if(response.data.statusCode==200){
        toast.success(response.data.message)
      }
    }catch(err){
      console.log(err)
    }
   
      setProducts(prev => prev.filter(product => product._id !== id));
    
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-2 sm:p-3">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 sm:py-8 rounded-2xl sm:rounded-4xl">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">Product Inventory</h1>
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
              placeholder="Search products by name or description..."
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
                <span className="text-red-600">No products found matching "{searchTerm}"</span>
              ) : (
                <span>
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{searchTerm}"
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
                : "Start by adding your first product to the inventory"
              }
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
              <div key={product._id} className="bg-white shadow-lg rounded-lg border border-slate-200 overflow-hidden ">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-3 sm:px-6 sm:py-4">
                  <h2 className="text-lg sm:text-xl font-semibold">{product.name}</h2>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6">
                  <div className="xl2_custom:flex lg:flex-row gap-4 sm:gap-6 ">
                    {/* Left Side - Product Image */}
                    <div className="flex-shrink-0 w-48 sm:w-56 lg:w-64 m-auto">
                      <img
                        src={product.picture}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center';
                        }}
                      />
                    </div>

                    {/* Right Side - Product Details (Vertical List) */}
                    <div className="flex-1 space-y-2.5 sm:space-y-3 font-sans">
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5 sm:mb-2">Description:</h3>
                        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{product.description}</p>
                      </div>

                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">Available Quantity:</h3>
                        <p className="text-base sm:text-lg font-medium text-slate-800">{product.availableQty} units</p>
                      </div>

                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">Price:</h3>
                        <p className="text-base sm:text-lg font-medium text-slate-800">{formatPrice(product.price)}</p>
                      </div>

                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">Discount Percentage:</h3>
                        <p className="text-base sm:text-lg font-medium text-green-600">{product.discountPercentage}%</p>
                      </div>

                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">Discounted Price:</h3>
                        <p className="text-base sm:text-lg font-bold text-slate-800">
                          {formatPrice(calculateDiscountedPrice(product.price, product.discountPercentage))}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">Delivery Time (in days):</h3>
                        <p className="text-base sm:text-lg font-medium text-slate-800">{product.deliveryTimeInDays} days</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom - Action Buttons */}
                  <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 sm:px-6 rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 sm:px-6 rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className='h-4 w-full'>

              </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Statistics */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">
              {searchTerm ? 'Search Results Summary' : 'Inventory Summary'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold">{filteredProducts.length}</div>
                <div className="text-slate-300 text-xs sm:text-sm">
                  {searchTerm ? 'Matching Products' : 'Total Products'}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {filteredProducts.reduce((sum, p) => sum + p.availableQty, 0)}
                </div>
                <div className="text-slate-300 text-xs sm:text-sm">Total Units</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {formatPrice(Math.min(...filteredProducts.map(p => calculateDiscountedPrice(p.price, p.discountPercentage))))}
                </div>
                <div className="text-slate-300 text-xs sm:text-sm">Lowest Price</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {formatPrice(Math.max(...filteredProducts.map(p => calculateDiscountedPrice(p.price, p.discountPercentage))))}
                </div>
                <div className="text-slate-300 text-xs sm:text-sm">Highest Price</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}