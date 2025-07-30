import mongoose,{Schema} from "mongoose";
const bannerSchema=new Schema({
    banner:{
        type:String,
        required:true,
    },
    bannerId:{
        type:String,
        required:true
    }
},{timestamps:true})
const bannerModel=mongoose.model("banner",bannerSchema);
export default bannerModel;
