import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is required"],
        unique:[true,"username must be different"]
    },
    email:{
        type:String,
        required:[true,"Email is required "],
        unique:[true,"Email must be different"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }   

})

const userModel = mongoose.model("users",userSchema);


export default userModel;