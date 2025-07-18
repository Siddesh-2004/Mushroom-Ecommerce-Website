import asyncHandler from "../utils/asynchandler.js";
const loginAdmin = asyncHandler(async (req, res) => {
    res.status(200).json({
        message:"ok",
    });
});
export { loginAdmin };