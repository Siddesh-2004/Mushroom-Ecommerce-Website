import React, { useState, useEffect } from "react";
import { Plus, Upload, X, Check, Package } from "lucide-react";
import axios from "../api/axios.config.js"

export default function AddShop() {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    address: "",
    phoneNumber: "",
    addressLink: "",
    ownerName: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      newErrors.photo = "Shop photo is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Shop name is required";
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Shop address is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    if (!formData.addressLink.trim()) {
      newErrors.addressLink = "Address link is required";
    } else if (!/^https?:\/\/.+/.test(formData.addressLink)) {
      newErrors.addressLink = "Please enter a valid URL";
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
      
      // Append all fields to FormData with correct field names
      formDataToSend.append('shopName', formData.name);
      formDataToSend.append('shopPhoneNumber', formData.phoneNumber);
      formDataToSend.append('shopOwnerName', formData.ownerName);
      formDataToSend.append('shopAddress', formData.address);
      formDataToSend.append('shopAddressLink', formData.addressLink);
      
      // Append the file
      if (formData.photo) {
        formDataToSend.append('picture', formData.photo);
      }

      // Note: You'll need to import axios or use fetch
      const response = await axios.post("/shop/add", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      
    
      
      
      setFormData({
        photo: null,
        name: "",
        address: "",
        phoneNumber: "",
        addressLink: "",
        ownerName: "",
      });
      setPhotoPreview(null);
      
    
      
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error adding shop. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                Add New Shop
              </h1>
              <p className="text-slate-300 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
                Add shop details in this form
              </p>
            </div>
          </div>

          {/* Form - responsive padding and spacing */}
          <div className="p-4 space-y-6 sm:p-6 sm:space-y-7 lg:p-8 lg:space-y-8">
            {/* Photo Upload */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Shop Photo *
              </label>

              {!photoPreview ? (
                <div className="group border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-10 text-center hover:border-slate-400 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer">
                  <Upload className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-400 mx-auto mb-3 sm:mb-4 group-hover:text-slate-600 group-hover:scale-110 transition-all duration-300" />
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">
                    Drop your shop image here or browse
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
                    alt="Shop preview"
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

            {/* Owner Name */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Owner Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("ownerName")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter owner name"
                  className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 font-medium text-sm sm:text-base ${
                    errors.ownerName
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : focusedField === "ownerName"
                      ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {focusedField === "ownerName" && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                )}
              </div>
              {errors.ownerName && (
                <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                  {errors.ownerName}
                </p>
              )}
            </div>

            {/* Shop Name */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Shop Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter shop name"
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

            {/* Shop Address */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Shop Address *
              </label>
              <div className="relative">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("address")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter complete shop address"
                  rows="3"
                  className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 resize-none font-medium text-sm sm:text-base ${
                    errors.address
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : focusedField === "address"
                      ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {focusedField === "address" && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                )}
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Phone Number and Address Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Phone Number */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("phoneNumber")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Enter phone number"
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 font-medium text-sm sm:text-base ${
                      errors.phoneNumber
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : focusedField === "phoneNumber"
                        ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {focusedField === "phoneNumber" && (
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                  )}
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Address Link */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                  Address Link *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="addressLink"
                    value={formData.addressLink}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("addressLink")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Enter Google Maps link"
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 font-medium text-sm sm:text-base ${
                      errors.addressLink
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : focusedField === "addressLink"
                        ? "border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {focusedField === "addressLink" && (
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                  )}
                </div>
                {errors.addressLink && (
                  <p className="text-red-500 text-xs sm:text-sm font-medium animate-pulse">
                    {errors.addressLink}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button - responsive sizing */}
            <div className="pt-4 sm:pt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg sm:shadow-xl hover:shadow-2xl text-sm sm:text-base lg:text-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Shop...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Add Shop</span>
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