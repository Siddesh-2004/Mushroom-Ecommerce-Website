import locationModel from "../models/location.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
const addLocation = asyncHandler(async (req, res) => {
    const { pincode, city , deliveryCharge } = req.body;

    // Validate required fields
    if (!pincode || !city || !deliveryCharge) {
        throw new ApiError(400, "Pincode, city, and delivery charge are required");
    }

    // Validate pincode
    if (typeof pincode !== 'number' || pincode <= 0) {
        throw new ApiError(400, "Pincode must be a positive number");
    }

    // Check if location already exists
    const existingLocation = await locationModel.findOne({ city: city.toLowerCase().trim() });
    if (existingLocation) {
        console.log('Location with this city already exists:', existingLocation);
        throw new ApiError(409, "Location with this city already exists");
    }

    // Create new location
    const location = await locationModel.create({
        pincode,
        city: city.toLowerCase().trim(),
        deliveryCharge
    });

    res.status(201).json(new ApiResponse(location, "Location created successfully", 201));
});
const deleteLocation = asyncHandler(async (req, res) => {
    const locationId = req.params.id;
    if (!locationId) {
        throw new ApiError(400, "Location ID is required");
    }

    const location = await locationModel.findByIdAndDelete(locationId);
    if (!location) {
        throw new ApiError(404, "Location not found or has already been deleted");
    }

    res.status(200).json(new ApiResponse(location, "Location deleted successfully", 200 ));
});
const viewLocations = asyncHandler(async (req, res) => {
    const locations = await locationModel.find().sort({ createdAt: -1 });
    if (!locations || locations.length === 0) {
        throw new ApiError(404, "No locations found or database is empty");
    }

    res.status(200).json(new ApiResponse(locations, "Locations retrieved successfully", 200));
});
export { addLocation, deleteLocation, viewLocations };