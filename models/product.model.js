import mongoose from "mongoose";
import ProductImages from "../models/product.images.model.js";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'users' 
    },
    sub_cate_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'subcategories' 
    },
    is_popular:{
        type:Boolean,
        default:0
    },
    description:{
        type:String,
        required:true
    },
    images:[ProductImages],
    status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    },
    createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
})
const Product = mongoose.model("product", ProductSchema);
export default Product;