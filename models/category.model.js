import mongoose from "mongoose";

const CategoryShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    },
    deletedAt:{
        type:Boolean,
        default:0
    },
    // createdAt: { type: Date, default: Date.now },
	// updatedAt: { type: Date, default: Date.now },
},{timestamps:true})
const Category = mongoose.model("categories", CategoryShema);
export default Category;