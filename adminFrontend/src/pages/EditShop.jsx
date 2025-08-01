import { Edit } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios.config";
import toast from "react-hot-toast";

const EditShop = () => {
  const [shop, setShop] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const Params = useParams();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`/shop/viewProduct/${Params.shopId}`);
        setShop(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShop();
  }, []);

  // Show loading state if shop data is not yet available
  if (!shop) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <p className="text-gray-700 text-xl">Loading shop details...</p>
      </div>
    );
  }

  const handleEditClick = (fieldName) => {
    setEditingField(fieldName);
    // Initialize edited value with current shop value for text fields
    if (fieldName !== "shopPicture") {
      setEditedValues((prev) => ({ ...prev, [fieldName]: shop[fieldName] }));
    } else {
      // Clear selected file if we're re-entering image edit mode without a file
      setSelectedImageFile(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      // Create object URL for instant preview
      setEditedValues((prev) => ({
        ...prev,
        shopPicture: URL.createObjectURL(file),
      }));
    } else {
      setSelectedImageFile(null);
      setEditedValues((prev) => {
        const newEditedValues = { ...prev };
        delete newEditedValues.shopPicture; // Remove temporary image URL
        return newEditedValues;
      });
    }
  };

  const handleSaveImage = async () => {
    if (!selectedImageFile) {
      alert("Please select an image file first.");
      return;
    }

    console.log("Saving image:", selectedImageFile);

    // Create FormData
    const formData = new FormData();
    formData.append("picture", selectedImageFile);

    // Send the formData to your backend API for image upload
    try {
      const response = await axios.post(`/shop/update/image/${Params.shopId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status === 200) {
        const newImageUrl = response.data.data.shopPicture; // Backend should return the new permanent URL

        // Update local shop state with the new permanent URL
        setShop((prevShop) => ({
          ...prevShop,
          shopPicture: newImageUrl,
        }));

        // Clean up temporary URL and state
        if (editedValues.shopPicture) {
          URL.revokeObjectURL(editedValues.shopPicture); // Clean up old object URL
        }
        setSelectedImageFile(null);
        setEditingField(null); // Exit editing mode for image
        setEditedValues((prev) => {
          // Clear edited image value
          const newEditedValues = { ...prev };
          delete newEditedValues.shopPicture;
          return newEditedValues;
        });

        toast.success("Shop image updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Failed to upload image.');
      // Revert UI or show error message
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting all other changes:", editedValues);

    // Send all editedValues (excluding image if handled separately) to your backend API
    try {
      const response = await axios.patch(`/shop/update/${shop._id}`, editedValues, {
        headers: { 'Content-Type': 'application/json' },
      });
      

      if (response.status === 200) {
        // Update the local shop state with new values for display
        setShop((prevShop) => ({
          ...prevShop,
          ...editedValues,
        }));

        // Reset editing state and clear temporary states
        setEditingField(null);
        setEditedValues({});
        setSelectedImageFile(null); // Ensure image file state is cleared
        toast.success("Shop updated successfully");
        
      }
    } catch (error) {
      console.error("Error updating shop:", error);
      alert('Failed to update shop details.');
    }
  };

  // Helper to render editable field or just text
  const renderField = (fieldName, label, type = "text", isHeader = false) => {
    const value =
      editedValues[fieldName] !== undefined
        ? editedValues[fieldName]
        : shop[fieldName];

    if (isHeader) {
      return (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-4 px-6 text-center items-center justify-between">
          {editingField === fieldName ? (
            <input
              type={type}
              name={fieldName}
              value={value}
              onChange={handleChange}
              className="flex-grow bg-slate-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-2xl font-semibold text-center"
            />
          ) : (
            <h2 className="text-2xl font-semibold flex-grow">{value}</h2>
          )}
          {editingField !== fieldName && (
            <button
              onClick={() => handleEditClick(fieldName)}
              className="ml-4 px-3 py-1 text-sm rounded-md bg-white text-slate-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Edit
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="flex-col items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
        <label className="font-semibold text-gray-900 w-1/3 min-w-[120px]">
          {label}:
        </label>
        <div className="flex-1 flex items-center space-x-2">
          {editingField === fieldName ? (
            type === "textarea" ? (
              <textarea
                name={fieldName}
                value={value}
                onChange={handleChange}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 min-h-[80px]"
              />
            ) : (
              <input
                type={type}
                name={fieldName}
                value={value}
                onChange={handleChange}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            )
          ) : (
            <span className="text-gray-700">
              {value}
            </span>
          )}
          {editingField !== fieldName && (
            <button
              onClick={() => handleEditClick(fieldName)}
              className="ml-auto px-3 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    );
  };

  // Determine the image to display for preview
  const displayImageUrl = selectedImageFile
    ? URL.createObjectURL(selectedImageFile)
    : shop.shopPicture;

  return (
    <div className="p-2">
      <div className="text-center rounded-4xl bg-gradient-to-r from-slate-800 to-slate-900 p-6 shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-white">
          Edit Shop Details
        </h1>
      </div>
      <div className="min-h-screen bg-white p-8 flex justify-center items-start">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-lg shadow-xl mb-6 mx-auto w-full overflow-hidden border border-gray-100">
            {/* Shop Name Header with Gradient - NOW EDITABLE */}
            {renderField("shopName", "Shop Name", "text", true)}

            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                {/* Shop Image and Edit/Save Button */}
                <div className="flex-shrink-0 w-full md:w-1/3 flex flex-col items-center justify-center space-y-3">
                  <img
                    src={displayImageUrl}
                    alt={shop.shopName}
                    className="w-48 h-48 object-cover rounded-lg shadow-md border border-gray-200"
                  />
                  {editingField === "shopPicture" ? (
                    <div className="flex flex-col items-center space-y-2 w-full max-w-[200px]">
                      <input
                        type="file"
                        name="shopPicture"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-slate-50 file:text-slate-700
                                    hover:file:bg-slate-100 cursor-pointer"
                      />
                      {selectedImageFile && ( // Only show save button if a file is selected
                        <button
                          onClick={handleSaveImage}
                          className="px-4 py-2 text-sm rounded-md bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-150 w-full"
                        >
                          Save Image
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="w-full h-2"></div>
                      <button
                        onClick={() => handleEditClick("shopPicture")}
                        className="px-4 py-2 text-sm rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      >
                        Change Image
                      </button>
                    </>
                  )}
                </div>

                {/* Shop Details - Right Side */}
                <div className="flex-grow w-full md:w-2/3">
                  {renderField("shopAddress", "Shop Address", "textarea")}
                  {renderField("shopOwnerName", "Owner Name", "text")}
                  {renderField("shopPhoneNumber", "Phone Number", "number")}
                  {renderField("shopAddressLink", "Address Link", "text")}
                </div>
              </div>

              {/* Submit Button for other changes */}
              <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-lg bg-slate-800 text-white font-medium text-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition ease-in-out duration-150 shadow-md"
                >
                  Submit All Other Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditShop;