import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    bio: {type: String},
    profilePic: {type: String,default: ""},
},{timeStamps: true});
const User = mongoose.model("User",userSchema);
