import mongoose from "mongoose";

const UserShema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:false
    },
    mobile:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    email_verified:{
        type:Boolean,
        required:false,
        default:false
    },
    number_verified:{
        type:Boolean,
        required:false,
        default:false
    },
    otp:{
        type:Number,
        required:false
    },

})
const User = mongoose.model("users", UserShema);
export default User;