import orderModel from "../models/order.model.js";
import locationModel from "../models/location.model.js";
import productModel from "../models/product.model.js";
import shopModel from "../models/shop.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";

const getDashBoardData = asyncHandler(async (req, res) => {
  //data required
  //total location
  //total orders
  //total shops
  //total Products
  try {
    const allLocations = await locationModel.find({});
    const allOrders = await orderModel.find({});
    const allShops = await shopModel.find({});
    const allProducts = await productModel.find({});
    const details = {
      totalLocations: allLocations.length,
      totalOrders: allOrders.length,
      totalShops: allShops.length,
      totalProducts: allProducts.length,
    };
     res
    .status(200)
    .json(new ApiResponse(details, "Dashboard Data retrived Successfully", 200));
  } catch (err) {
    throw new ApiError(
      500,
      err.message ||
        "Internal Server error while retriving Dashboard data from the database"
    );
  }
 
});
export default getDashBoardData;
