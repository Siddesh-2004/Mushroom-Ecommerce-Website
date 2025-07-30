import React, { useState, useEffect } from "react";
import { Plus, Upload, X, Check, Package } from "lucide-react";
import axios from "../api/axios.config";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    description: "",
    quantity: "",
    price: "",
    discount: "",
    deliveryTime: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      if (errors.photo) {
        setErrors((prev) => ({
          ...prev,
          photo: "",
        }));
      }
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
    }));
    setPhotoPreview(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.photo) {
      newErrors.photo = "Product photo is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (parseInt(formData.quantity) < 0) {
      newErrors.quantity = "Quantity must be a positive number";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (
      formData.discount &&
      (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100)
    ) {
      newErrors.discount = "Discount must be between 0 and 100";
    }

    if (!formData.deliveryTime) {
      newErrors.deliveryTime = "Delivery time is required";
    } else if (
      parseInt(formData.deliveryTime) < 1 ||
      parseInt(formData.deliveryTime) > 365
    ) {
      newErrors.deliveryTime = "Delivery time must be between 1 and 365 days";
    }

    if (!formData.discount) {
      formData.discount = "0";
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
  try {
    // Create FormData object for file upload
    const formDataToSend = new FormData();
    
    // Append all fields to FormData
    formDataToSend.append('name', formData.name);
    formDataToSend.append('availableQty', formData.quantity);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('discountPercentage', formData.discount || '0');
    formDataToSend.append('description', formData.description);
    formDataToSend.append('deliveryTimeInDays', formData.deliveryTime);
    
    // Append the file
    if (formData.photo) {
      formDataToSend.append('picture', formData.photo);
    }

    const response = await axios.post("/product/add", formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success(response.data.message)

    
    
    // Reset form on success
    setFormData({
      photo: null,
      name: "",
      description: "",
      quantity: "",
      price: "",
      discount: "",
      deliveryTime: "",
    });
    setPhotoPreview(null);
    
    setIsSubmitting(false);
    
    
  } catch (err) {
    toast.error(err.response.data.message)
    setIsSubmitting(false);
    // Handle error - maybe show error message to user
  }
};

  const calculateDiscountedPrice = () => {
    if (formData.price && formData.discount) {
      const price = parseFloat(formData.price);
      const discount = parseFloat(formData.discount);
      return (price - (price * discount) / 100).toFixed(2);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 px-3 sm:py-6 sm:px-4 lg:py-8">
      <div className="max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
          {/* Header with gradient - responsive padding and text sizes */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
            <div className="relative z-10">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="p-2 sm:p-2.5 lg:p-3 bg-white/10 rounded-lg lg:rounded-xl backdrop-blur-sm border border-white/20">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </div>
                Add New Product
              </h1>
              <p className="text-slate-300 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
                Create a new product listing
              </p>
            </div>
          </div>

          {/* Form - responsive padding and spacing */}
          <div className="p-4 space-y-6 sm:p-6 sm:space-y-7 lg:p-8 lg:space-y-8">
            {/* Photo Upload */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Product Photo *
              </label>

              {!photoPreview ? (
                <div className="group border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-10 text-center hover:border-slate-400 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer">
                  <Upload className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-400 mx-auto mb-3 sm:mb-4 group-hover:text-slate-600 group-hover:scale-110 transition-all duration-300" />
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">
                    Drop your image here or browse
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-lg cursor-pointer hover:bg-slate-900 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                  >
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                    Choose File
                  </label>
                </div>
              ) : (
                <div className="relative inline-block group">
                  <img
                    src={photoPreview}
                    alt="Product preview"
                    className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 object-cover rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-500 text-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-red-600 hover:scale-110 transition-all duration-300"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}

              {errors.photo && (
                <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                  {errors.photo}
                </p>
              )}
            </div>

            {/* Product Name */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Product Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter product name"
                  className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 font-medium text-sm sm:text-base ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : focusedField === "name"
                      ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {focusedField === "name" && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                )}
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Product Description *
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Describe the product features and benefits"
                  rows="3"
                  className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 resize-none font-medium text-sm sm:text-base ${
                    errors.description
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : focusedField === "description"
                      ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {focusedField === "description" && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                )}
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Quantity and Price Grid - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Quantity */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                  Quantity *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("quantity")}
                    onBlur={() => setFocusedField("")}
                    placeholder="0"
                    min="0"
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 font-medium text-sm sm:text-base ${
                      errors.quantity
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : focusedField === "quantity"
                        ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {focusedField === "quantity" && (
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                  )}
                </div>
                {errors.quantity && (
                  <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                    {errors.quantity}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                  Price (₹) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("price")}
                    onBlur={() => setFocusedField("")}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 font-medium text-sm sm:text-base ${
                      errors.price
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : focusedField === "price"
                        ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {focusedField === "price" && (
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                  )}
                </div>
                {errors.price && (
                  <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                    {errors.price}
                  </p>
                )}
              </div>
            </div>

            {/* Discount and Delivery Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Discount */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                  Discount (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("discount")}
                    onBlur={() => setFocusedField("")}
                    placeholder="0"
                    min="0"
                    max="100"
                    step="0.01"
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 font-medium text-sm sm:text-base ${
                      errors.discount
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : focusedField === "discount"
                        ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {focusedField === "discount" && (
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                  )}
                </div>
                {errors.discount && (
                  <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                    {errors.discount}
                  </p>
                )}
              </div>

              {/* Delivery Time */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                  Delivery Time (Days) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="1"
                    max="365"
                    step="1"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("deliveryTime")}
                    onBlur={() => setFocusedField("")}
                    placeholder="0"
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 font-medium text-sm sm:text-base ${
                      errors.deliveryTime
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : focusedField === "deliveryTime"
                        ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {focusedField === "deliveryTime" && (
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                  )}
                </div>
                {errors.deliveryTime && (
                  <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                    {errors.deliveryTime}
                  </p>
                )}
              </div>
            </div>

            {/* Price Preview - responsive text and spacing */}
            {calculateDiscountedPrice() && (
              <div className="mt-2 sm:mt-3 p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg sm:rounded-xl shadow-inner">
                <p className="text-xs sm:text-sm text-slate-800 font-medium">
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    Final Price: ₹{calculateDiscountedPrice()}
                  </span>
                  <span className="text-gray-500 ml-2 sm:ml-3 line-through text-sm sm:text-base">
                    ₹{formData.price}
                  </span>
                  <span className="ml-1 sm:ml-2 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-100 text-green-800 rounded-md sm:rounded-lg text-xs font-semibold">
                    {formData.discount}% OFF
                  </span>
                </p>
              </div>
            )}

            {/* Submit Button - responsive sizing */}
            <div className="pt-4 sm:pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg sm:shadow-xl hover:shadow-2xl text-sm sm:text-base lg:text-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : submitSuccess
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    : "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Product...</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                    <span>Product Added Successfully!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Add Product</span>
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
