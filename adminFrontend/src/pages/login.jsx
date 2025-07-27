import React, { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import axios from "../api/axios.config.js"

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    const backendCall=async()=>{

      const loginPayload={username:formData.username,password:formData.password}
      try{
        const response=await axios.post('/admin/login',loginPayload)
        console.log(response)
      }catch(err){
        console.log("there was an error",err);
      }

    }

    
    setIsSubmitting(false);
    
    // Handle successful login (redirect, etc.)
   
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3 sm:p-4 lg:p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-8 sm:px-8 sm:py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
            <div className="relative z-10 text-center">
              {/* <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🍄</span>
              </div> */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Mushrooms
              </h1>
              <p className="text-slate-300 text-sm sm:text-base">
                Admin Portal Login
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-6">
              
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    autocomplete="false"
                    value={formData.username}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Enter your username"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 font-medium ${
                      errors.username 
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                        : focusedField === 'username'
                        ? 'border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  {focusedField === 'username' && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                  )}
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm font-medium animate-pulse">{errors.username}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 font-medium ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                        : focusedField === 'password'
                        ? 'border-slate-400 focus:border-slate-600 focus:ring-4 focus:ring-slate-100 shadow-lg'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  {focusedField === 'password' && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-100/20 to-transparent pointer-events-none"></div>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm font-medium animate-pulse">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-3 sm:py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-xl hover:shadow-2xl text-base sm:text-lg ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Additional Links
            <div className="pt-4 text-center border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                Forgot your password?{' '}
                <button className="text-slate-800 hover:text-slate-900 font-semibold hover:underline transition-colors">
                  Reset here
                </button>
              </p>
            </div> */}
          </div>
        </div>


      </div>
    </div>
  );
}