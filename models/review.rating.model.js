import mongoose from "mongoose";

const ReviewRatingShema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"users",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,ref:"product",
        required:true
    },
    rating:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    },
    review:{
        type:String,
    },
    status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    },
    createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
})
const ReviewRating = mongoose.model("review_rating", ReviewRatingShema);
export default ReviewRating;