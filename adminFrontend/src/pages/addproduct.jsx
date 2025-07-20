import React, { useState, useEffect } from 'react';
import { Plus, Upload, X, Check, Leaf, Sparkles, TreePine } from 'lucide-react';

export default function AdminProductAdd() {
  const [formData, setFormData] = useState({
    photo: null,
    name: '',
    description: '', // New field added
    quantity: '',
    price: '',
    discount: ''
  });
  
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setMounted(true);
    // Generate floating spore particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
    }));
    setParticles(newParticles);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      if (errors.photo) {
        setErrors(prev => ({
          ...prev,
          photo: ''
        }));
      }
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo: null
    }));
    setPhotoPreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.photo) {
      newErrors.photo = 'Mushroom photo is required for the grove catalog';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Mushroom species name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Mushroom description helps understand its properties';
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Available quantity is required';
    } else if (parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    
    if (!formData.price) {
      newErrors.price = 'Pricing per unit is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (formData.discount && (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100)) {
      newErrors.discount = 'Forest discount must be between 0 and 100';
    }
   if(!formData.discount){
        formData.discount = '0'; // Default to 0 if not provided
   }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        photo: null,
        name: '',
        description: '',
        quantity: '',
        price: '',
        discount: ''
      });
      setPhotoPreview(null);
      setSubmitSuccess(false);
    }, 2000);
  };

  const calculateDiscountedPrice = () => {
    if (formData.price && formData.discount) {
      const price = parseFloat(formData.price);
      const discount = parseFloat(formData.discount);
      return (price - (price * discount / 100)).toFixed(2);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 py-8 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-pulse opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          >
            <div className="w-full h-full bg-green-300 rounded-full animate-float"></div>
          </div>
        ))}
      </div>

      {/* Floating Mushroom Decorations */}
      <div className="absolute top-10 left-10 animate-bounce opacity-30">
        <TreePine className="w-8 h-8 text-green-400" />
      </div>
      <div className="absolute bottom-20 right-20 animate-bounce opacity-30" style={{ animationDelay: '1s' }}>
        <Leaf className="w-6 h-6 text-emerald-400" />
      </div>

      <div className="max-w-2xl mx-auto">
        <div 
          className={`bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-700 ${
            mounted ? "animate-slideInUp" : "opacity-0 translate-y-10"
          }`}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-6 py-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Plus className="w-6 h-6" />
                </div>
                Add New Mushroom 
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              </h1>
              <p className="text-green-100 mt-2 opacity-90">Catalog a new mushroom variety</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-8">
            {/* Photo Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-green-100">
                Mushroom Photography *
              </label>
              
              {!photoPreview ? (
                <div className="border-2 border-dashed border-green-400/30 rounded-2xl p-8 text-center hover:border-green-400/60 transition-all duration-300 bg-white/5 backdrop-blur-sm group">
                  <Upload className="w-16 h-16 text-green-300 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-green-200 mb-3 text-lg">Capture the mushroom's essence</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-block bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-xl cursor-pointer hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Browse Gallery
                  </label>
                </div>
              ) : (
                <div className="relative inline-block group">
                  <img
                    src={photoPreview}
                    alt="Mushroom preview"
                    className="w-40 h-40 object-cover rounded-2xl border-2 border-green-400/50 shadow-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-300 shadow-lg hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              )}
              
              {errors.photo && (
                <p className="text-red-400 text-sm animate-shake">{errors.photo}</p>
              )}
            </div>

            {/* Product Name */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-green-100">
                Mushroom Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  placeholder="e.g., Shiitake, Oyster Mushroom, Lion's Mane"
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white placeholder-green-300/70 ${
                    errors.name ? 'border-red-400/50' : 'border-white/20 focus:border-emerald-400/50'
                  }`}
                />
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                  focusedField === 'name' ? "bg-gradient-to-r from-emerald-400/10 to-green-400/10" : ""
                }`}></div>
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm animate-shake">{errors.name}</p>
              )}
            </div>

            {/* Description Field - NEW */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-green-100">
                Mushroom Description *
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Describe the mushroom's appearance, taste, texture, and culinary uses..."
                  rows="4"
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white placeholder-green-300/70 resize-none ${
                    errors.description ? 'border-red-400/50' : 'border-white/20 focus:border-emerald-400/50'
                  }`}
                />
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                  focusedField === 'description' ? "bg-gradient-to-r from-emerald-400/10 to-green-400/10" : ""
                }`}></div>
              </div>
              {errors.description && (
                <p className="text-red-400 text-sm animate-shake">{errors.description}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-green-100">
                Quantity *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('quantity')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Enter quantity in stock"
                  min="0"
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white placeholder-green-300/70 ${
                    errors.quantity ? 'border-red-400/50' : 'border-white/20 focus:border-emerald-400/50'
                  }`}
                />
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                  focusedField === 'quantity' ? "bg-gradient-to-r from-emerald-400/10 to-green-400/10" : ""
                }`}></div>
              </div>
              {errors.quantity && (
                <p className="text-red-400 text-sm animate-shake">{errors.quantity}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-green-100">
                Price (₹) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Enter price per unit"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white placeholder-green-300/70 ${
                    errors.price ? 'border-red-400/50' : 'border-white/20 focus:border-emerald-400/50'
                  }`}
                />
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                  focusedField === 'price' ? "bg-gradient-to-r from-emerald-400/10 to-green-400/10" : ""
                }`}></div>
              </div>
              {errors.price && (
                <p className="text-red-400 text-sm animate-shake">{errors.price}</p>
              )}
            </div>

            {/* Discount Percentage */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-green-100">
                Seasonal Discount (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('discount')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Enter seasonal discount percentage"
                  min="0"
                  max="100"
                  step="0.01"
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white placeholder-green-300/70 ${
                    errors.discount ? 'border-red-400/50' : 'border-white/20 focus:border-emerald-400/50'
                  }`}
                />
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                  focusedField === 'discount' ? "bg-gradient-to-r from-emerald-400/10 to-green-400/10" : ""
                }`}></div>
              </div>
              {errors.discount && (
                <p className="text-red-400 text-sm animate-shake">{errors.discount}</p>
              )}
              
              {/* Price Preview */}
              {calculateDiscountedPrice() && (
                <div className="mt-3 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl backdrop-blur-sm animate-fadeIn">
                  <p className="text-sm text-emerald-200">
                    <span className="font-semibold">Final Price: ₹{calculateDiscountedPrice()}</span>
                    <span className="text-green-300 ml-2">(Original: ₹{formData.price})</span>
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl relative overflow-hidden group ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : submitSuccess
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="relative z-10">Adding Mushroom to Database...</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <Check className="w-6 h-6 animate-bounce" />
                    <span className="relative z-10">Mushroom Added to Grove! 🍄</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    <span className="relative z-10">Add Mushroom</span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}