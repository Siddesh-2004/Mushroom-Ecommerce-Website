import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const productSchema = new Schema({
    picture:{
        type: String,
        required: true,     
    },
    pictureId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    qty:{
        type: Number,
        required: true,
        min: 0
    },
    price:{
        type: Number,
        required: true,
        min: 0      
    },
    discountPercentage:{
        type: Number,
        min: 0,
        max: 100,
        default: 0
    }
},{
    timestamps: true
});
const productModel = mongoose.model('Product', productSchema);
export default productModel;
