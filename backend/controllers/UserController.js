import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const signup = async(req,res) => {
    const {fullname, email, password, bio} = req.body;
    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message: "Missing Details"})
        }
        const user = await User.findOne({email});
        if(user) {
            return res.json({success: false, message: "Account already exists"})
        }
        const salt = await bcrypt.getSalt(10);
        const hanshedPassword = await bcrypt.hash(password,salt);
        
        const newUser = await User.create({
            fullName, email, password: hanshedPassword, bio
        });
        const token = generateToken(newUser._id);
        res.json({success: true, userData: newUser, token, message: "Account created successfully" })
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message })

    }
}
