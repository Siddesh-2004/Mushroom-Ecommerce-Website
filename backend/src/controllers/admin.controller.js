import asyncHandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import {ApiError} from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";
const loginAdmin = asyncHandler(async (req, res) => {
   const { username, password } = req.body;
   if(!username || !password) {
        throw new ApiError(400, "Username and password are required");
    }
    if (username != process.env.ADMIN_USERNAME || password != process.env.ADMIN_PASSWORD) {
        throw new ApiError(401, "Invalid username or password");
    }
    const accesToken =  jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h' });
    if(!accesToken) {
        throw new ApiError(500, "Failed to generate access token");
    }
    // console.log(accesToken);
    const options={
        httpOnly: true,
        secure:true
    }
    return res
        .cookie("accessToken", accesToken, options)
        .status(200)
        .json(new ApiResponse(username,"Login successful",200));

});
const logoutAdmin = asyncHandler(async (req, res) => {
    //clear the cookie
    return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200)
        .json(new ApiResponse(null, "Logout successful", 200));
});






export { loginAdmin, logoutAdmin };