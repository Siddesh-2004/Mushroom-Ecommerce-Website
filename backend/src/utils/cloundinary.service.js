import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadOnCloudinary = async (filePath) => {
    try{
        if(!filePath) return null;
        //uploading file to cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto'
        });
        console.log('File uploaded successfully:', result);
        return result;
    }catch (error) {
       fs.unlinkSync(filePath); // Delete the file if upload fails
       console.error('Error uploading file to Cloudinary:', error);
       return null;
    }
}
