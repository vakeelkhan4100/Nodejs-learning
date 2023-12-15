import mongoose from "mongoose";

const SubCategoryShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    },
    cateId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'categories' 
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'users' 
    },
    createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
})
const SubCategory = mongoose.model("subcategories", SubCategoryShema);
export default SubCategory;