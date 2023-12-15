import mongoose from "mongoose";

const UserShema = new mongoose.Schema({
    who_follow:{//sahiljoya || aarif
        type:String,
        required:true
    },
    who_followed:{//aarif || sahiljoya
        type:String,
        required:true
    },
    is_block:{//0 || 0
        type:String,
        required:true
    },
    accepted:{//1 || 0
        type:String,
        required:false
    },
})
const User = mongoose.model("users", UserShema);
export default User;