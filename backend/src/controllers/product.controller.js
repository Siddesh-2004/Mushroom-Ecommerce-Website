import productModel from '../models/product.model.js';
import asyncHandler from '../utils/asynchandler.js';
import ApiResponse from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiErrors.js';
import { uploadOnCloudinary ,deleteFromCloudinary} from '../services/cloundinary.service.js';
const addProduct = asyncHandler(async (req, res) => {
    //get the product data from the request formdata
    //check if the product data is present and valid
    //if not throw an error
    //if the product data is valid, create a new product
    //save the product to the database
    //return the product data in the response with success message
    let { name, availableQty, price, description, discountPercentage , deliveryTimeInDays} = req.body;
    availableQty = parseInt(availableQty, 10);
    price = parseFloat(price);  
    discountPercentage = parseFloat(discountPercentage);
    deliveryTimeInDays = parseInt(deliveryTimeInDays, 10);

    if (!name || !availableQty || !price || !discountPercentage|| !deliveryTimeInDays) {

        throw new ApiError(400, 'All fields are required');
    }
    if( typeof availableQty !== 'number' || availableQty < 0) {
        console.log('Invalid quantity:', typeof availableQty);
        throw new ApiError(400, 'Quantity must be a non-negative number');
    }
    if( typeof price !== 'number' || price < 0) {
        throw new ApiError(400, 'Price must be a non-negative number');
    }
    if( typeof discountPercentage !== 'number' || discountPercentage < 0 || discountPercentage > 100) {
        throw new ApiError(400, 'Discount percentage must be between 0 and 100');
    }
    if( typeof deliveryTimeInDays !== 'number' || deliveryTimeInDays < 1) {
        throw new ApiError(400, 'Delivery time in days must be a positive integer');
    }
    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
        throw new ApiError(409, 'Product with this name already exists');
    }
    
    const localProductPicturePath = req.file?.path;
    console.log("req.file:", req.file);
    
    if (!localProductPicturePath) {
        throw new ApiError(400, 'Product picture is required');
    }
    const cloudinaryResponse = await uploadOnCloudinary(localProductPicturePath);
    if (!cloudinaryResponse) {
        throw new ApiError(500, 'Failed to upload product picture');
    }
    console.log('Cloudinary response:', cloudinaryResponse);

    const product=await productModel.create({
        name: name.toLowerCase(),
        availableQty,
        price,
        description,
        discountPercentage,
        picture: cloudinaryResponse.secure_url,
        pictureId: cloudinaryResponse.public_id,
        deliveryTimeInDays
    })
    console.log('Product created:', product);
    const createdProduct=await productModel.findById(product._id)
    if(!createdProduct) {
        throw new ApiError(500, 'Failed to create product');
    }
    res.status(201).json(new ApiResponse(createdProduct,'Product created successfully',201));



});

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
        throw new ApiError(400, 'Product ID is required');
    }
    const productToBeDeleted = await productModel.findById(productId);
    if (!productToBeDeleted) {
        throw new ApiError(400, 'Product does not exist or has already been deleted');
    }
    const cloudinaryDeleteResponse = await deleteFromCloudinary(productToBeDeleted.pictureId);
    if (cloudinaryDeleteResponse.result == 'not found') {
        throw new ApiError(500, 'Failed to delete product picture from Cloudinary');
    }
    console.log('Cloudinary delete response:', cloudinaryDeleteResponse);
    const deletedProduct = await productModel.findByIdAndDelete(productToBeDeleted._id);
   
    if (!deletedProduct) {
        throw new ApiError(500, 'Failed to delete product from database');
    }
    res.status(200).json(new ApiResponse(deletedProduct, 'Product deleted successfully', 200));
});
const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    let { name, availableQty, price, discountPercentage, description, deliveryTimeInDays } = req.body;

    if (!name || !availableQty || !price || !discountPercentage|| !productId|| !description|| !deliveryTimeInDays) {
        throw new ApiError(400, 'All fields are required');
    }

    availableQty = parseInt(availableQty, 10);
    price = parseFloat(price);
    discountPercentage = parseFloat(discountPercentage);
    deliveryTimeInDays = parseInt(deliveryTimeInDays, 10);

    if( typeof availableQty !== 'number' || availableQty < 0) {
        throw new ApiError(400, 'Quantity must be a non-negative number');
    }
    if( typeof price !== 'number' || price < 0) {
        throw new ApiError(400, 'Price must be a non-negative number');
    }
    if( typeof discountPercentage !== 'number' || discountPercentage < 0 || discountPercentage > 100) {
        throw new ApiError(400, 'Discount percentage must be between 0 and 100');
    }
    if( typeof deliveryTimeInDays !== 'number' || deliveryTimeInDays < 1) {
        throw new ApiError(400, 'Delivery time in days must be a positive integer');
    }
    if (!productId) {
        throw new ApiError(400, 'Product ID is required');
    }
    const productToUpdate = await productModel.findById(productId);
    if (!productToUpdate) {
        throw new ApiError(400, 'Product does not exist or has already been deleted');
    }
    if( productToUpdate.name.toLowerCase() !== name.toLowerCase()) {
        productToUpdate.name = name.toLowerCase();
        //save the updated product name to the database
        
    }
    if( productToUpdate.availableQty !== availableQty) {
        productToUpdate.availableQty = availableQty;
    }
    if( productToUpdate.price !== price) {
        productToUpdate.price = price;
    }
    if( productToUpdate.discountPercentage !== discountPercentage) {
        productToUpdate.discountPercentage = discountPercentage;
    }
    if( productToUpdate.description !== description) {
        productToUpdate.description = description;
    } 
    if( productToUpdate.deliveryTimeInDays !== deliveryTimeInDays) {
        productToUpdate.deliveryTimeInDays = deliveryTimeInDays;
    }  
    if(!req.file) {
        //if no new picture is uploaded, keep the old picture
        productToUpdate.picture = productToUpdate.picture;
        productToUpdate.pictureId = productToUpdate.pictureId;
    }
    else{
        const localPathOfNewPicture = req.file.path;
        const cloudinaryResponse = await uploadOnCloudinary(localPathOfNewPicture);
        if (!cloudinaryResponse) {
            throw new ApiError(500, 'Failed to update product picture');
        }
        console.log('Cloudinary response:', cloudinaryResponse);
        //delete the old picture from cloudinary
        const cloudinaryDeleteResponse = await deleteFromCloudinary(productToUpdate.pictureId);
        if (cloudinaryDeleteResponse.result == 'not found') {
            throw new ApiError(500, 'Failed to delete old product picture from Cloudinary');
        }
        productToUpdate.picture = cloudinaryResponse.secure_url;
        productToUpdate.pictureId = cloudinaryResponse.public_id;
    }
    console.log('Product to update:', productToUpdate);
    //save the updated product to the database
   const updatedProduct = await productToUpdate.save();
    res.status(200).json(new ApiResponse(updatedProduct, 'Product updated successfully', 200));
});

const viewAllProduct = asyncHandler(async (req, res) => {
    const products = await productModel.find({});
    if (!products || products.length === 0) {
        throw new ApiError(404, 'No products found or all products have been deleted');
    }
    console.log('Products retrieved:', products);
    res.status(200).json(new ApiResponse(products, 'Products retrieved successfully', 200));
});

export { addProduct, deleteProduct ,updateProduct, viewAllProduct };