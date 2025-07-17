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
    }},{
    timestamps:true     
});
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;