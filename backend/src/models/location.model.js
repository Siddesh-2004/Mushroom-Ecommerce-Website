import mongoose,{Schema} from "mongoose";
const locationSchema=new Schema({
    pincode:{
        type:Number,    
        required:true,
       
    },
    city:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    deliveryCharge:{
        type:Number,
        required:true
    }
},{
    timestamps:true 
});
const locationModel=mongoose.model("Location",locationSchema);
export default locationModel;