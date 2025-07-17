import React, { useState } from 'react';
import { Plus, Upload, X, Check } from 'lucide-react';

export default function AdminProductAdd() {
  const [formData, setFormData] = useState({
    photo: null,
    name: '',
    quantity: '',
    price: '',
    discount: ''
  });
  
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
      newErrors.photo = 'Product photo is required';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (formData.discount && (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100)) {
      newErrors.discount = 'Discount must be between 0 and 100';
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Add New Product
            </h1>
            <p className="text-blue-100 mt-1">Fill in the details to add a new product to your inventory</p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Photo *
              </label>
              
              {!photoPreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 mb-2">Click to upload product photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={photoPreview}
                    alt="Product preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                      </button>
                </div>
              )}
              
              {errors.photo && (
                <p className="text-red-500 text-sm">{errors.photo}</p>
              )}
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                min="0"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            {/* Discount Percentage */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Discount Percentage (%)
              </label>
              <input
                required
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="Enter discount percentage"
                min="0"
                max="100"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.discount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">{errors.discount}</p>
              )}
              
              {/* Price Preview */}
              {calculateDiscountedPrice() && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Final Price: ₹{calculateDiscountedPrice()}</span>
                    <span className="text-gray-600 ml-2">(Original: ₹{formData.price})</span>
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white font-medium transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : submitSuccess
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Product...
                  </>
                ) : submitSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    Product Added Successfully!
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}