import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    fullName:{type:String,required:true},
    username:{type:String , required:true,unique:true,minlength:3},
    password:{type:String,required:true,minlength:6},
    profilePic:{type:String,default:""}
},{timestamps:true})

const User = mongoose.model("User",UserModel);
export default User;