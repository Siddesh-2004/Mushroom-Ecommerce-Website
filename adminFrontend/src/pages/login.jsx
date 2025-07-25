import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Leaf, AlertCircle, CheckCircle } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [shake, setShake] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    setTimeout(() => {
      if (formData.username === "admin" && formData.password === "admin123") {
        setMessage({
          type: "success",
          text: "Welcome to the Mushroom ! 🍄",
        });

        setTimeout(() => {
          alert("Entering the admin realm...");
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: "Invalid credentials. Try again.",
        });
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
      setIsLoading(false);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Mushroom Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '3s'
            }}
          >
            <div className="text-4xl opacity-20 animate-bounce">🍄</div>
          </div>
        ))}
      </div>

      {/* Mystical Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className={`relative group transition-all duration-500 transform ${
            shake ? "animate-bounce" : "hover:scale-105"
          }`}
        >
          {/* Glowing Background Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
          
          {/* Main Card */}
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 hover:border-green-400/50 transition-all duration-500">
            
            {/* Mushroom Header */}
            <div className="text-center mb-8 relative">
              {/* Glowing Mushroom Icon */}
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-2xl transform hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/50 to-transparent animate-pulse"></div>
                <div className="text-4xl relative z-10 animate-bounce">🍄</div>
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent mb-3 animate-pulse">
                Mushroom 
              </h1>
              <p className="text-green-100/80 text-sm font-medium">
                Enter the user credentials
              </p>
              
              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-4 text-green-300/30 animate-spin">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="absolute -top-2 -right-4 text-green-300/30 animate-spin" style={{ animationDirection: 'reverse' }}>
                <Leaf className="w-6 h-6" />
              </div>
            </div>

            {/* ✅ ✅ ✅ Proper <form> wrapper starts here */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-3 group">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-green-100 group-hover:text-green-200 transition-colors duration-300"
                >
                  🌱 USERNAME
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-green-500/30 focus:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-500 bg-white/10 backdrop-blur-sm placeholder-green-200/60 text-white font-medium hover:bg-white/15"
                    placeholder="Enter your username"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3 group">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-green-100 group-hover:text-green-200 transition-colors duration-300"
                >
                  🗝️ PASSWORD
                </label>
                <div className="relative">
                  <input
                  
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-green-500/30 focus:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-500 bg-white/10 backdrop-blur-sm placeholder-green-200/60 text-white font-medium hover:bg-white/15"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-300 hover:text-green-200 transition-all duration-300 hover:scale-110 p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                      <span className="text-lg">logging in...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg">🍄 login</span>
                    </>
                  )}
                </div>
              </button>

              {/* Message Display */}
              {message.text && (
                <div
                  className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-500 transform ${
                    message.type === "error"
                      ? "bg-red-500/20 text-red-200 border border-red-500/30 backdrop-blur-sm"
                      : "bg-green-500/20 text-green-200 border border-green-500/30 backdrop-blur-sm"
                  } animate-bounce`}
                >
                  {message.type === "error" ? (
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  )}
                  <span className="font-medium">{message.text}</span>
                </div>
              )}
            </form>

            {/* Decorative Bottom Elements */}
            <div className="mt-8 flex justify-center space-x-4 text-2xl opacity-30">
              <div className="animate-bounce" style={{ animationDelay: '0s' }}>🌿</div>
              <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>🍄</div>
              <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>🌱</div>
              <div className="animate-bounce" style={{ animationDelay: '0.6s' }}>🍄</div>
              <div className="animate-bounce" style={{ animationDelay: '0.8s' }}>🌿</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
