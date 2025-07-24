import mongoose,{Schema} from "mongoose";
const orderSchema = new Schema({
    fullName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    pincode:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        enum:["cod","online"]
    },
    orderStatus:{
        type:String,
        required:true,
        enum:["not delivered","delivered"],
        default:"not delivered"
    },
   orderQty:{
        type:Number,
        required:true,
        min: 1
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    }
},{
    timestamps:true     
});
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;