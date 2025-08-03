import React, { useState } from 'react';
import { Upload, X, Image, Trash2, Plus, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import axios from '../api/axios.config';
import toast from 'react-hot-toast';

export default function AddBanners() {
  const [banners, setBanners] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const refreshTriggerFunction = () => {
    setRefreshTrigger(prev => prev + 1);
  }

  useEffect(() => {
    const asyncHandler = async () => {
      try {
        const response = await axios.get('/banner/view');
        setBanners(response.data.data)
      } catch (err) {
        console.error(err);
       toast.error(err.response.data.message)
      }
    }
    asyncHandler()
  }, [refreshTrigger])

  // Validate file type and size
  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setError('');
    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    setIsUploading(true);
    const loader=toast.loading("Adding Banners")
    try {
      // Create FormData properly
      const formData = new FormData();
      formData.append('picture', selectedFile);
      
      const response = await axios.post("/banner/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
   toast.dismiss(loader)
   toast.success("Banner Added Successfully")
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setError('');
      
      // Reset file input
      const fileInput = document.getElementById('banner-upload');
      if (fileInput) fileInput.value = '';
      
      // Refresh banners from server
      refreshTriggerFunction();
      
      console.log('Banner uploaded successfully');
      
    } catch (error) {
      toast.dismiss(loader)
      toast.error('Failed to upload banner. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle banner deletion
  const handleDelete = async (bannerId) => {
    const loader=toast.loading("Deleting Banner")
    try {
        console.log(bannerId)
      // Make API call to delete banner
    //   toast.loading("Deleting the banner")
      const response=await axios.delete(`/banner/delete/${bannerId}`);
      toast.dismiss(loader)
      toast.success(response.data.message);
      
      // Refresh banners from server
      // Instead of refreshTriggerFunction(), try:
setBanners(prev => prev.filter(banner => banner._id !== bannerId));
      refreshTriggerFunction();
      
    } catch (error) {
      toast.dismiss(loader)
      console.error('Delete error:', error);
      setError('Failed to delete banner. Please try again.');
    }
  };

  // Clear preview
  const clearPreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError('');
    const fileInput = document.getElementById('banner-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto lg:w-1/2">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8  rounded-2xl shadow-xl mb-6 sm:mb-8">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <Image className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Banner Management
              </h1>
            </div>
            <p className="text-slate-200 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto">
              Upload and manage promotional banners for your e-commerce store
            </p>
          </div>
        </div>
        <div className='w-full h-4'></div>

        {/* Add Banner Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-6 sm:mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
              Add New Banner
            </h2>
          </div>

          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* File Upload Section */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Banner Image *
                </label>

                {!previewUrl ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center hover:border-slate-400 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer group">
                    <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 group-hover:text-slate-600 group-hover:scale-110 transition-all duration-300" />
                    <p className="text-gray-600 mb-4 text-base sm:text-lg font-medium">
                      Drop your banner image here or browse
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      Supports: JPEG, PNG, WebP • Max size: 5MB
                    </p>
                    <input
                      type="file"
                      id="banner-upload"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-3 rounded-xl cursor-pointer hover:from-slate-700 hover:to-slate-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Image
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative rounded-xl overflow-hidden shadow-lg group">
                      <img
                        src={previewUrl}
                        alt="Banner preview"
                        className="w-full h-64 sm:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={clearPreview}
                          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 font-medium">
                      <span className="font-semibold">Selected:</span> {selectedFile?.name}
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isUploading || !selectedFile}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl text-base sm:text-lg ${
                    isUploading || !selectedFile
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800"
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading Banner...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add Banner</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-4'></div>

        {/* Banner List Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <Image className="w-5 h-5 sm:w-6 sm:h-6" />
              Current Banners ({banners.length})
            </h2>
          </div>

          <div className="p-6 sm:p-8">
            {banners.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Banners Added</h3>
                <p className="text-gray-600 font-medium">
                  Upload your first banner to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {banners.map((banner) => (
                  <div
                    key={banner._id}
                    className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Banner Image */}
                    <div className="relative">
                      <img
                        src={banner.banner}
                        alt={`Banner ${banner._id}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleDelete(banner._id)}
                          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg transform hover:scale-110"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Banner Info */}
                  
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        {banners.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-center uppercase tracking-wide">
              Banner Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{banners.length}</div>
                <div className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Total Banners
                </div>
              </div>
              {/* <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-green-400">Active</div>
                <div className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Status
                </div>
              </div> */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-yellow-400">
                  {new Date().toLocaleDateString()}
                </div>
                <div className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Last Updated
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}