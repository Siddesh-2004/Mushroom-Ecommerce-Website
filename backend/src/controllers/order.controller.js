import ApiResponse from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import asyncHandler from "../utils/asynchandler.js";
import locationModel from "../models/location.model.js";
import mongoose from "mongoose";

const addOrder = asyncHandler(async (req, res) => {
  // validate if all required fields are present
  //validate if pincode is valid and exists in the database
  //validate if productId is valid and exists in the database
  //validate if qty is valid and less than or equal to the available stock
  //validate if paymentMethod is valid
  //set orderStatus to "not delivered"
  // create order
  const {
    fullName,
    phoneNumber,
    address,
    pincode,
    paymentMethod,
    orderQty,
    productId,
  } = req.body;
  if (
    !fullName ||
    !phoneNumber ||
    !address ||
    !pincode ||
    !paymentMethod ||
    !orderQty ||
    !productId
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const location = await locationModel.findOne({ pincode });
  if (!location) {
    throw new ApiError(400, "Sorry, we do not deliver to this pincode");
  }
  const product = await productModel.findById(productId);
  if (!product) {
    throw new ApiError(400, "Invalid product ID");
  }
  if (product.availableQty < orderQty) {
    throw new ApiError(
      400,
      "Sorry, we do not have requested stock for this product"
    );
  }
  product.availableQty -= orderQty;
  const updatedProduct = await product.save();
  console.log("Updated product stock:", updatedProduct.availableQty);
  if (!["cod", "online"].includes(paymentMethod)) {
    throw new ApiError(400, "Invalid payment method");
  }

  const order = await orderModel.create({
    fullName,
    phoneNumber,
    address,
    pincode,
    paymentMethod,
    orderQty,
    productId: new mongoose.Types.ObjectId(productId),
    orderStatus: "not delivered",
  });
  res
    .status(201)
    .json(new ApiResponse(order, "Order created successfully", 201));
});

const viewOrder = asyncHandler(async (req, res) => {
  const orders = await orderModel
    .aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
          pipeline: [
            {
              $project: {
                picture: 1,
                name: 1,
                availableQty: 1,
                price: 1,
                discountPercentage: 1,
                deliveryTimeInDays: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          productDetails: {
            $first: "$productDetails",
          },
          deliveryDate: {
            $dateAdd: {
              startDate: "$createdAt",
              unit: "day",
              amount: { $first: "$productDetails.deliveryTimeInDays" },
            },
          },
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "pincode",
          foreignField: "pincode",
          as: "deliveryDetails",
          pipeline: [
            {
              $project: {
                deliveryCharge: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          deliveryDetails: {
            $first: "$deliveryDetails",
          },
        },
      },
      {
        $addFields: {
          discountedPrice: {
            $multiply: [
              "$productDetails.price",
              {
                $subtract: [
                  1,
                  { $divide: ["$productDetails.discountPercentage", 100] },
                ],
              },
            ],
          },
        },
      },
      {
        $addFields: {
          productAmount: {
            $multiply: ["$orderQty", "$discountedPrice"],
          },
        },
      },
      {
        $addFields: {
          totalAmount: {
            $add: ["$productAmount", "$deliveryDetails.deliveryCharge"],
          },
        },
      },
      {
        $addFields: {
          createdAtIST: {
            $dateToString: {
              date: "$createdAt",
              timezone: "Asia/Kolkata",
              format: "%Y-%m-%dT%H:%M:%S.%L+05:30",
            },
          },
          updatedAtIST: {
            $dateToString: {
              date: "$updatedAt",
              timezone: "Asia/Kolkata",
              format: "%Y-%m-%dT%H:%M:%S.%L+05:30",
            },
          },
          deliveryDateIST: {
            $dateToString: {
              date: "$deliveryDate",
              timezone: "Asia/Kolkata",
              format: "%Y-%m-%dT%H:%M:%S.%L+05:30",
            },
          },
        },
      },
    ])
    .sort({ createdAt: -1 });
  if (!orders || orders.length === 0) {
    throw new ApiError(404, "There are no orders yet!!");
  }
  res
    .status(200)
    .json(new ApiResponse(orders, "Orders retrieved successfully", 200));
});

const viewCustomerOrder = asyncHandler(async (req, res) => {
  const orderIds = req.body.orderIds;
  if (!orderIds || orderIds.length === 0) {
    throw new ApiError(400, "Order IDs are required");
  }
  const orders = [];
  for (const orderId of orderIds) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new ApiError(400, `Invalid order ID: ${orderId}`);
    }
    let order = await orderModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(orderId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
          pipeline: [
            {
              $project: {
                picture: 1,
                name: 1,
                availableQty: 1,
                price: 1,
                discountPercentage: 1,
                deliveryTimeInDays: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          productDetails: {
            $first: "$productDetails",
          },
          deliveryDate: {
            $dateAdd: {
              startDate: "$createdAt",
              unit: "day",
              amount: { $first: "$productDetails.deliveryTimeInDays" },
            },
          },
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "pincode",
          foreignField: "pincode",
          as: "deliveryDetails",
          pipeline: [
            {
              $project: {
                deliveryCharge: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          deliveryDetails: {
            $first: "$deliveryDetails",
          },
        },
      },
      {
        $addFields: {
          discountedPrice: {
            $multiply: [
              "$productDetails.price",
              {
                $subtract: [
                  1,
                  { $divide: ["$productDetails.discountPercentage", 100] },
                ],
              },
            ],
          },
        },
      },
      {
        $addFields: {
          productAmount: {
            $multiply: ["$orderQty", "$discountedPrice"],
          },
        },
      },
      {
        $addFields: {
          totalAmount: {
            $add: ["$productAmount", "$deliveryDetails.deliveryCharge"],
          },
        },
      },
      {
        $addFields: {
          createdAtIST: {
            $dateToString: {
              date: "$createdAt",
              timezone: "Asia/Kolkata",
              format: "%Y-%m-%dT%H:%M:%S.%L+05:30",
            },
          },
          updatedAtIST: {
            $dateToString: {
              date: "$updatedAt",
              timezone: "Asia/Kolkata",
              format: "%Y-%m-%dT%H:%M:%S.%L+05:30",
            },
          },
          deliveryDateIST: {
            $dateToString: {
              date: "$deliveryDate",
              timezone: "Asia/Kolkata",
              format: "%Y-%m-%dT%H:%M:%S.%L+05:30",
            },
          },
        },
      },
    ]);
    if(!order || order.length === 0) {
      throw new ApiError(404, `No orders found for ID: ${orderId}`);
    }
    orders.push(order[0]);
  }
  if (orders.length === 0) {
    throw new ApiError(404, "No orders found for the provided IDs");
  }

  res.status(200).json(new ApiResponse(orders, "Customer orders retrieved successfully", 200));

});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, orderStatus } = req.body;
  if (!orderId || !orderStatus) {
    throw new ApiError(400, "Order ID and status are required");
  }
  const order = await orderModel.findById(orderId);
  if (!order) {
    throw new ApiError(404, `No order found with ID: ${orderId}`);
  }
  order.orderStatus = orderStatus;
  const updatedOrder = await order.save();
  res
    .status(200)
    .json(
      new ApiResponse(updatedOrder, "Delivery status updated successfully", 200)
    );
});

export { addOrder, viewOrder, viewCustomerOrder, updateOrderStatus };
