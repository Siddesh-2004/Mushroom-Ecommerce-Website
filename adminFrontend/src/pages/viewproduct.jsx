import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, Trash2, Search, ArrowLeft, TreePine, Leaf } from 'lucide-react';

const ViewProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1518634833275-0bf5d50fd506?w=150&h=150&fit=crop',
      name: 'Shiitake Mushroom',
      description: 'Premium shiitake mushrooms with rich umami flavor, perfect for stir-fries and soups.',
      quantity: 25,
      price: 299.99,
      discount: 15
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=150&h=150&fit=crop',
      name: 'Oyster Mushroom',
      description: 'Fresh oyster mushrooms with delicate flavor and silky texture.',
      quantity: 12,
      price: 199.99,
      discount: 10
    }
  ]);

  const [currentPage, setCurrentPage] = useState('view');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({ ...product });
    setCurrentPage('edit');
  };

  const handleSave = async () => {
    // Validate required fields
    if (!editForm.name || !editForm.description || !editForm.quantity || !editForm.price) {
      alert('Please fill in all required fields');
      return;
    }

    // Create FormData for backend submission
    const formData = new FormData();
    formData.append('id', editForm.id);
    formData.append('name', editForm.name);
    formData.append('description', editForm.description);
    formData.append('quantity', editForm.quantity);
    formData.append('price', editForm.price);
    formData.append('discount', editForm.discount || 0);
    
    // If image is a File object, append it; otherwise append the existing image URL
    if (editForm.imageFile) {
      formData.append('image', editForm.imageFile);
    } else if (editForm.image) {
      formData.append('imageUrl', editForm.image);
    }

    try {
      // Here you would send the formData to your backend
      // const response = await fetch('/api/products', {
      //   method: 'PUT',
      //   body: formData
      // });
      
      // For now, just update the local state
      setProducts(products.map(p => p.id === editingProduct.id ? { ...editForm } : p));
      setCurrentPage('view');
      setEditingProduct(null);
      setEditForm({});
      
      console.log('Form data ready for backend:', Object.fromEntries(formData));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancel = () => {
    setCurrentPage('view');
    setEditingProduct(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this item?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: field === 'price' || field === 'discount'
        ? parseFloat(value) || ''
        : field === 'quantity'
        ? parseInt(value) || ''
        : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({
          ...prev,
          image: reader.result,
          imageFile: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateDiscountedPrice = (price, discount) =>
    price - (price * discount) / 100;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const EditPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 p-8 relative overflow-hidden">
    {/* Particles */}
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
    <TreePine className="absolute top-10 left-10 text-green-400 w-8 h-8 opacity-40 animate-bounce" />
    <Leaf className="absolute bottom-10 right-10 text-emerald-400 w-6 h-6 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />

    <div className={`max-w-4xl mx-auto transition-all duration-700 ${mounted ? 'animate-slideInUp' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-6">
        <button 
          onClick={handleCancel} 
          className="flex items-center gap-2 mb-4 hover:text-emerald-200 transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <div className="space-y-4">
          {/* Image Preview */}
          {editForm.image && (
            <div className="mb-4">
              <img
                src={editForm.image}
                alt="Product Preview"
                className="w-full max-h-64 object-cover rounded-xl shadow-md"
              />
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Product Image</label>
            <label className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow cursor-pointer hover:bg-emerald-600 transition-all inline-block">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Name *</label>
            <input
              type="text"
              value={editForm.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Description *</label>
            <textarea
              rows={3}
              value={editForm.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              placeholder="Enter product description"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Quantity *</label>
            <input
              type="number"
              min="0"
              value={editForm.quantity || ''}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter quantity"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Price (₹) *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={editForm.price || ''}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter price"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={editForm.discount || ''}
              onChange={(e) => handleInputChange('discount', e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter discount percentage"
            />
          </div>

          {/* Preview of calculated price */}
          {editForm.price && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Original Price:</span>
                <span className="font-semibold">₹{parseFloat(editForm.price).toFixed(2)}</span>
              </div>
              {editForm.discount > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Discount:</span>
                    <span className="text-green-600 font-semibold">{editForm.discount}%</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-green-700 border-t border-green-200 pt-2 mt-2">
                    <span>Final Price:</span>
                    <span>₹{calculateDiscountedPrice(editForm.price, editForm.discount || 0).toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-all font-semibold"
            >
              <Save size={18} className="inline mr-2" /> Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-600 text-white py-3 rounded-xl hover:scale-105 transition-all font-semibold"
            >
              <X size={18} className="inline mr-2" /> Cancel
            </button>
          </div>
        </div>
      </div>
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

  if (currentPage === 'edit') return <EditPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 p-8 relative overflow-hidden">
      {/* Particles */}
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
      <TreePine className="absolute top-10 left-10 text-green-400 w-8 h-8 opacity-40 animate-bounce" />
      <Leaf className="absolute bottom-10 right-10 text-emerald-400 w-6 h-6 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />

      <div className={`max-w-7xl mx-auto transition-all duration-700 ${mounted ? 'animate-slideInUp' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl p-8 mb-6 shadow-xl">
          <h1 className="text-3xl font-bold">View Products</h1>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-3 text-emerald-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="bg-white/20 backdrop-blur-sm text-white placeholder-white/70 pl-12 w-full py-3 rounded-xl border border-emerald-300/50 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-white/20 hover:scale-105"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
              <div className="space-y-1 mb-4">
                <p className="text-gray-600 text-sm">Quantity: <span className="font-semibold">{product.quantity}</span></p>
                <p className="text-gray-800 font-bold">₹{product.price.toFixed(2)}</p>
                {product.discount > 0 && (
                  <p className="text-sm text-emerald-600 font-bold">{product.discount}% OFF</p>
                )}
                <p className="text-lg font-bold text-green-700">
                  ₹{calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2 rounded-lg shadow hover:scale-105 transition-all font-semibold"
                >
                  <Edit3 size={16} className="inline mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg shadow hover:scale-105 transition-all font-semibold"
                >
                  <Trash2 size={16} className="inline mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-white text-center mt-20 text-xl">
            {searchTerm ? 'No products found matching your search.' : 'No products found.'}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ViewProductsPage;