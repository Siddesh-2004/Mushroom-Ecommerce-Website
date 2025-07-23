import mongoose,{Schema} from "mongoose";
const orderSchema = new Schema({
    name:{
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
    totalAmount:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        required:true,
        enum:["pending","processing","shipped","delivered","cancelled"],
        default:"pending"
    },
    qty:{
        type:Number,
        required:true,
        min: 1
    },
    productId:{
        type:[Schema.Types.ObjectId],
        ref:"Product",
        required:true
    }
},{
    timestamps:true     
});
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;