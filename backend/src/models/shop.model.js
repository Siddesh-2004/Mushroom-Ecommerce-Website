import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const shopSchema = new Schema({
    shopPicture:{
        type: String,
        required: true,     
    },
    shopPictureId:{
        type: String,
        required: true
    },
    shopName:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    shopOwnerName:{
        type: String,
        trim: true
    },
    shopAddress:{
        type:String,
        trim:true
    },
    shopAddressLink:{
        type:String,
        required:true
    },
    shopPhoneNumber:{
        type:Number,
        required:true
    }
},{
    timestamps: true
});
const shopModel = mongoose.model('shop', shopSchema);
export default shopModel;
