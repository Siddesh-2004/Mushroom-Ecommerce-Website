import asyncHandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    path: '/'
};
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Username and password are required");
  }
  if (
    username != process.env.ADMIN_USERNAME ||
    password != process.env.ADMIN_PASSWORD
  ) {
    throw new ApiError(401, "Invalid username or password");
  }
  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
  });
  if (!accessToken) {
    throw new ApiError(500, "Failed to generate access token");
  }
  return res
        .cookie("accessToken", accessToken, COOKIE_OPTIONS)
        .status(200)
        .json(new ApiResponse(username, "Login successful", 200));
});
const logoutAdmin = asyncHandler(async (req, res) => {
    console.log("cookies before logging out",req.cookies)
    return res
        .clearCookie("accessToken", COOKIE_OPTIONS)
        .status(200)
        .json(new ApiResponse(null, "Logout successful", 200));
});
const verifyJwtAdmin=asyncHandler(async(req,res)=>{
    try{
         console.log(req.cookies)
        const accessToken=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ", "")
       
        if(!accessToken){
            throw new ApiError(401,"Please Login")
        }
        const decodedToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        if(decodedToken.username!=process.env.ADMIN_USERNAME){
            console.log(decodedToken.username);
            throw new ApiError(400,"Invalid AccessToken");
        }
        res.status(200).json(new ApiResponse({},"Auto Login Successful",200));


    }catch(err){
        throw new ApiError(401, err?.message || "Invalid access token")
    }
})

export { loginAdmin, logoutAdmin ,verifyJwtAdmin};
