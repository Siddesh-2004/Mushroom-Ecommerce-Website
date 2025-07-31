import bannerModel from "../models/banners.model.js";
import {ApiError} from "../utils/apiErrors.js"
import ApiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asynchandler.js"
import {deleteFromCloudinary, uploadOnCloudinary} from "../services/cloundinary.service.js"
const addBanner=asyncHandler(async(req,res)=>{
    const bannerLocalPath=req.file?.path;
    if(!bannerLocalPath){
        throw new ApiError(400,"Banner photo is required");
    }
    const cloundinaryUploadResponse=await uploadOnCloudinary(bannerLocalPath)
    console.log("cloundinary respone",cloundinaryUploadResponse)
    if(!cloundinaryUploadResponse){
        throw new ApiError(500,"Internal Server Error while Uploading the picture");
    }
    const banner=cloundinaryUploadResponse.secure_url;
    if(!banner){
        throw new ApiError(500,"Internal Server Error while extracting the url")
    }
    const bannerId=cloundinaryUploadResponse.public_id;
    if(!bannerId){
        throw new ApiError(500,"Internal Server Error while extracting the public_id");
    }
    const bannerDocument=await bannerModel.create({
        banner,
        bannerId
    })
    if(!bannerDocument){
        throw new ApiError(501,"Internal Server Error while creating document in the Database  ")
    }
    res.status(200).json(new ApiResponse(bannerDocument,"Banner was added Successfully"));

    
})
const deleteBanner=asyncHandler(async(req,res)=>{
    const bannerId=req.params.id;
    if(!bannerId){
         throw new ApiError(400,"banner id is required")
    }
    const bannerToBeDeleted=await bannerModel.findById(bannerId)
    if(!bannerToBeDeleted){
        throw new ApiError(404,"banner not found in Database");
    }
    const cloundinaryDeleteResponse=await deleteFromCloudinary(bannerToBeDeleted.bannerId);
    if(!cloundinaryDeleteResponse||cloundinaryDeleteResponse.result=='not found'){
        throw new ApiError(500,"Internal server error while deleting the photo from cloundinary")
    }
    const deletedBanner=await bannerModel.findByIdAndDelete(bannerId);
    if(!deletedBanner){
        throw new ApiError(500,"Internal server error while deleting banner in the database");
    }
    res.status(200).json(new ApiResponse(deleteBanner,"Deleted Successfully",200));
})


const viewBanners=asyncHandler(async(req,res)=>{
    const banners= await bannerModel.find({});
    if(!banners||banners.length==0){
        throw new ApiError(404,"There are no banner available")
    }
    res.status(200).json(new ApiResponse(banners,"Banners are retrieved successfully"));
})
export {addBanner,deleteBanner,viewBanners};