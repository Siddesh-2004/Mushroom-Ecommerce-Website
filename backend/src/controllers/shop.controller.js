import shopModel from "../models/shop.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../services/cloundinary.service.js";
import mongoose from "mongoose";
const addShop = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new ApiError(400, "Request is body is required");
  }
  const {
    shopName,
    shopOwnerName,
    shopAddress,
    shopAddressLink,
    shopPhoneNumber,
  } = req.body;
  if (
    !shopName ||
    !shopAddress ||
    !shopAddressLink ||
    !shopOwnerName ||
    !shopPhoneNumber
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingShop = await shopModel.findOne({ shopName, shopPhoneNumber });
  if (existingShop) {
    console.log("existing shop :", existingShop);
    throw new ApiError(400, "Shop already exists");
  }
  const shopPictureLocalPath = req.file?.path;
  if (!shopPictureLocalPath) {
    throw new ApiError(400, "Shop picture is required");
  }
  const cloudinaryResponse = await uploadOnCloudinary(shopPictureLocalPath);
  if (!cloudinaryResponse) {
    throw new ApiError(
      500,
      "Internal server error while uploading the shop picture"
    );
  }
  console.log("cloudinary response :", cloudinaryResponse.secure_url);
  const shopPicture = cloudinaryResponse.secure_url;
  if (!shopPicture) {
    throw new ApiError(502, "Internal server error while extracting the url");
  }
  const shopPictureId = cloudinaryResponse.public_id;
  console.log("shopPictureId:", cloudinaryResponse.public_id);
  if (!shopPictureId) {
    throw new ApiError(
      503,
      "Internal server error while extracting the public_Id"
    );
  }

  const shop = await shopModel.create({
    shopName,
    shopOwnerName,
    shopAddress,
    shopAddressLink,
    shopPhoneNumber,
    shopPicture,
    shopPictureId,
  });
  if (!shop) {
    throw new ApiError(
      504,
      "Internal server error while creating shop in database"
    );
  }
  res.status(200).json(new ApiResponse(shop, "Shop created successfully", 200));
});
const updateShopImage = asyncHandler(async (req, res) => {
  const shopId = req.params.id;
  const shopPictureLocalPath = req.file?.path;
  if (!shopPictureLocalPath) {
    throw new ApiError(400, "Shop Image is required");
  }
  if (!shopId) {
    throw new ApiError(400, "Shop id is required");
  }
  const shopToUpdate = await shopModel.findById(shopId);
  const cloudinaryResponse = await uploadOnCloudinary(shopPictureLocalPath);
  if (!cloudinaryResponse) {
    throw new ApiError(500, "Failed to update shop picture");
  }
  console.log("Cloudinary response:", cloudinaryResponse);
  //delete the old picture from cloudinary

  const cloudinaryDeleteResponse = await deleteFromCloudinary(
    shopToUpdate.pictureId
  );
  if (cloudinaryDeleteResponse?.result == "not found") {
    throw new ApiError(
      500,
      "Failed to delete old shop picture from Cloudinary"
    );
  }
  shopToUpdate.picture = cloudinaryResponse.secure_url;
  shopToUpdate.pictureId = cloudinaryResponse.public_id;
  shopToUpdate.save();
  res
    .status(200)
    .json(new ApiResponse(shopToUpdate, "shopImage updated successfully", 200));
});

const deleteShop = asyncHandler(async (req, res) => {
  let shopId = req.params.id;
  shopId = new mongoose.Types.ObjectId(shopId);
  if (!req.params.id) {
    throw new ApiError(400, "The shop id is required through params");
  }
  if (!shopId) {
    throw new ApiError(401, "Id is not provided");
  }

  const shopToBeDeleted = await shopModel.findOne(shopId);
  if (!shopToBeDeleted || shopToBeDeleted.length == 0) {
    throw new ApiError(
      402,
      "The shop details doesnt exist or this  shop has already been deleted"
    );
  }
  console.log("shopToBeDeleted details:", shopToBeDeleted);
  const cloudinaryResponse = await deleteFromCloudinary(
    shopToBeDeleted.shopPictureId
  );
  console.log("publice id is ", shopToBeDeleted.shopPictureId);
  console.log("cloudinary response while deleting is :", cloudinaryResponse);
  if (cloudinaryResponse == "not found" || !cloudinaryResponse) {
    throw new ApiError(
      500,
      "Internal server error while deleting the photo from cloundinary"
    );
  }
  const deletedShop = await shopModel.findOneAndDelete(shopId);

  res
    .status(200)
    .json(new ApiResponse(deletedShop, "The shop details are deleted"));
});

const updateShop = asyncHandler(async (req, res) => {
  const shopId = req.params.id;
  if (!req.params.id || !shopId) {
    throw new ApiError(400, "shopId is required");
  }
  const shopToBeUpdated = await shopModel.findById(shopId);
  if (!shopToBeUpdated) {
    throw new ApiError(400, "this shop does not exists or it has been deleted");
  }

  const {
    shopName,
    shopOwnerName,
    shopAddress,
    shopAddressLink,
    shopPhoneNumber,
  } = req.body;
  if (shopName) shopToBeUpdated.shopName = shopName;
  if (shopOwnerName) shopToBeUpdated.shopOwnerName = shopOwnerName;
  if (shopAddress) shopToBeUpdated.shopAddress = shopAddress;
  if (shopAddressLink) shopToBeUpdated.shopAddressLink = shopAddressLink;
  if (shopPhoneNumber) shopToBeUpdated.shopPhoneNumber = shopPhoneNumber;

  const updatedShop = await shopToBeUpdated.save();
  if (!updatedShop) {
    throw new ApiError(503, "Error in updating the shop in database");
  }
  res
    .status(200)
    .json(new ApiResponse(updatedShop, "Shop Details Updated successfully"));
});
const viewAllShops = asyncHandler(async (req, res) => {
  const shops = await shopModel.find();
  if (shops.length == 0 || !shops) {
    throw new ApiError(400, "They are no shops");
  }

  res
    .status(200)
    .json(new ApiResponse(shops, "shops retrieved successfully", 200));
});
const viewSingleShop = asyncHandler(async (req, res) => {
  const shopId = req.params.id;
  if (!shopId) {
    throw new ApiError(400, "shop id is required");
  }
  const shop = await shopModel.findById(shopId);
  if (!shop) {
    throw new ApiError(400, "Cant find the shop in the database");
  }
  res
    .status(200)
    .json(new ApiResponse(shop, "Shop successfully retrieved", 200));
});

export {
  addShop,
  deleteShop,
  updateShop,
  viewAllShops,
  viewSingleShop,
  updateShopImage,
};
