import React, { useState, useEffect } from "react";
import { Search, X, DeleteIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../api/axios.config";

export default function Location() {
  // Using useState to force re-render
const [refreshTrigger, setRefreshTrigger] = useState(0);


const forceRefresh = () => {
  setRefreshTrigger(prev => prev + 1);
};
  const [filteredLocationsState, setFilteredLocationsState] = useState([]);
  const [formData, setFormData] = useState({
    pincode: "",
    cityName: "",
    deliveryCharge: "",
  });

  const [locations, setLocations] = useState([]);
  
  useEffect(() => {
    const asyncHandler = async () => {
      try {
        const response = await axios.get("/location/view");
        console.log("API Response:", response.data.data);
        setLocations(response.data.data);
        // Remove success toast for data fetching
        // toast.success(response.data.message);
      } catch (err) {
        console.error("Error fetching locations:", err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch locations";
        toast.error(errorMessage);
      }
    };

    asyncHandler();
  }, [refreshTrigger]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validation
    if (!formData.pincode || !formData.cityName || !formData.deliveryCharge) {
      alert("Please fill in all fields");
      return;
    }
    try{
      const response=await axios.post('/location/add',{
        pincode: Number(formData.pincode),
         city: formData.cityName ,
         deliveryCharge:formData.deliveryCharge
      })
      toast.success(response.data.message)
    }catch(err){
      console.log(err.response.data.message)
    }
  
    forceRefresh();

    // Add new location
    const newLocation = {
      id: Date.now(),
      pincode: formData.pincode,
      cityName: formData.cityName,
      deliveryCharge: parseFloat(formData.deliveryCharge),
    };

    setLocations((prev) => [...prev, newLocation]);

    // Reset form
    setFormData({
      pincode: "",
      cityName: "",
      deliveryCharge: "",
    });
  };

  const handleDelete = async(id) => {
     setLocations(prev => prev.filter(product => product._id !== id));
    try{
      console.log(id);
      const response=await axios.delete(`/location/delete/${id}`)
      if(response.data.statusCode==200){
        toast.success(response.data.message)
      }
    }catch(err){
      console.log(err)
    }
   
     
    
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // FIXED: Proper filter logic
  useEffect(() => {
    if (searchTerm.trim()) {
      const filteredLocations = locations.filter((location) => {
        const pincode = location.pincode?.toString() || "";
        const city = location.city || location.cityName || "";
        
        return (
          pincode.includes(searchTerm) ||
          city.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredLocationsState(filteredLocations);
    } else {
      // Show all locations when no search term
      setFilteredLocationsState(locations);
    }
  }, [searchTerm, locations]);

  return (
    <div className="min-h-screen bg-white pt-3 pr-2">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8 rounded-4xl">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Location Management
          </h1>
          <p className="text-slate-300 text-center mt-2">
            Manage delivery locations and charges
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-8 w-full">
        {/* Form Section */}
        <div className="xl_custom:w-1/2 m-auto bg-white shadow-lg rounded-lg border border-slate-200">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 rounded-t-lg">
            <h2 className="text-2xl font-semibold text-center">
              Add New Location
            </h2>
          </div>

          <div className="pt-6 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Pincode
                </label>
                <input
                  type="number"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors"
                  placeholder="Enter pincode"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="cityName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Name of the City
                </label>
                <input
                  type="text"
                  id="cityName"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors"
                  placeholder="Enter city name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="deliveryCharge"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Delivery Charge (₹)
                </label>
                <input
                  type="number"
                  id="deliveryCharge"
                  name="deliveryCharge"
                  value={formData.deliveryCharge}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors"
                  placeholder="Enter delivery charge"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center p-5">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Submit Location
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-4"></div>

        {/* Search Section */}
        <div className="xl_custom:w-2/4 m-auto ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors text-slate-700 placeholder-slate-400"
              placeholder="Search locations by pincode or city name..."
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-slate-600">
              {filteredLocationsState.length === 0 ? (
                <span className="text-red-600">
                  No locations found matching "{searchTerm}"
                </span>
              ) : (
                <span>
                  Found {filteredLocationsState.length} location
                  {filteredLocationsState.length !== 1 ? "s" : ""} matching "
                  {searchTerm}"
                </span>
              )}
            </div>
          )}
        </div>
        <div className="w-full h-4 "></div>
        {/* Table Section */}
        <div className="bg-white shadow-lg rounded-lg border border-slate-200 xl_custom:w-3/5 m-auto">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 rounded-t-lg text-center">
            <h2 className="text-3xl font-semibold">Locations Available</h2>
            <p className="text-slate-300 text-sm mt-1">
              {searchTerm
                ? `${filteredLocationsState.length} of ${locations.length} location${
                    locations.length !== 1 ? "s" : ""
                  } shown`
                : `${locations.length} location${
                    locations.length !== 1 ? "s" : ""
                  } configured`}
            </p>
          </div>

          <div className="overflow-x-auto">
            {filteredLocationsState.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <div className="text-6xl mb-4">{searchTerm ? "🔍" : "📍"}</div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                  {searchTerm ? "No locations found" : "No locations added yet"}
                </h3>
                <p className="text-sm">
                  {searchTerm
                    ? `No locations match your search for "${searchTerm}". Try a different search term.`
                    : "Start by adding your first delivery location above"}
                </p>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="mt-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Pincode
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Name of the City
                    </th>
                    <th className=" py-4 text-left text-sm font-semibold text-slate-700">
                      Delivery Charge
                    </th>
                    <th className=" text-left text-sm font-semibold text-slate-700   xl_custom:visible">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredLocationsState.map((location) => (
                    <tr
                      key={location._id || location.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {location.pincode}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {location.city || location.cityName}
                      </td>
                      <td className=" py-4 text-sm text-slate-700">
                        ₹{parseFloat(location.deliveryCharge || 0).toFixed(2)}
                      </td>
                      <td className=" py-4 text-sm">
                        <button
                          onClick={() => handleDelete(location._id || location.id)}
                          className="text-red-600 hover:text-red-800 font-medium hover:underline transition-colors"
                        >
                          <Trash2 className="text-shadow-slate-700" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="w-full h-4"></div>

        {/* Summary Card */}
        {filteredLocationsState.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-6 xl_custom:w-1/2 mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {searchTerm ? "Search Results Summary" : "Location Summary"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {filteredLocationsState.length}
                </div>
                <div className="text-slate-300 text-sm">
                  {searchTerm ? "Matching Locations" : "Total Locations"}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ₹
                  {Math.min(
                    ...filteredLocationsState.map((l) => parseFloat(l.deliveryCharge || 0))
                  ).toFixed(2)}
                </div>
                <div className="text-slate-300 text-sm">Minimum Charge</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ₹
                  {Math.max(
                    ...filteredLocationsState.map((l) => parseFloat(l.deliveryCharge || 0))
                  ).toFixed(2)}
                </div>
                <div className="text-slate-300 text-sm">Maximum Charge</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}