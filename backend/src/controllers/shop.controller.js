import shopModel from "../models/shop.model.js";
import asyncHandler from "../utils/asynchandler.js"
import ApiResponse from "../utils/apiResponse.js"
import {ApiError} from "../utils/apiErrors.js"
import {uploadOnCloudinary} from "../services/cloundinary.service.js";
const addShop=asyncHandler(async (req,res) => {
    if(!req.body){
        throw new ApiError(400,"Request is body is required")
    }
    const {shopName,shopOwnerName,shopAddress,shopAddressLink,shopPhoneNumber}=req.body;
    if(!shopName||!shopAddress||!shopAddressLink||!shopOwnerName||!shopPhoneNumber){
        throw new ApiError(400,"All fields are required");
    }
    const existingShop=await shopModel.findOne({shopName,shopPhoneNumber});
    if(existingShop){
        console.log("existing shop :",existingShop)
        throw new ApiError(400,"Shop already exists");
    }
    const shopPictureLocalPath =req.file?.path;
    if(!shopPictureLocalPath){
        throw new ApiError(400,"Shop picture is required");
    }
    const cloudinaryResponse=await uploadOnCloudinary(shopPictureLocalPath);
    if(!cloudinaryResponse){
        throw new ApiError(500,"Internal server error while uploading the shop picture")
    }
    console.log("cloudinary response :" ,cloudinaryResponse.secure_url);
    const shopPicture=cloudinaryResponse.secure_url;
    if(!shopPicture){
        throw new ApiError(502,"Internal server error while extracting the url");
    }
    const shopPictureId=cloudinaryResponse.public_id;
    console.log("shopPictureId:",cloudinaryResponse.public_id)
    if(!shopPictureId){
        throw new ApiError(503,"Internal server error while extracting the public_Id")
    }

    const shop=await shopModel.create({
        shopName,
        shopOwnerName,
        shopAddress,
        shopAddressLink,
        shopPhoneNumber,
        shopPicture,
        shopPictureId
    })
    if(!shop){
        throw new ApiError(504,"Internal server error while creating shop in database")
    }
    res.status(200).json(new ApiResponse(shop,"Shop created successfully",200));
})
export {addShop};