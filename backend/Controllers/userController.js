import cloudinary from "../lib/cloudinary.js";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  const { fullName, bio, profilePic, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const newUser = new User({ fullName, bio, profilePic, email, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      userData: newUser,
      message: "Account created successfully"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
  
      res.status(200).json({
        success: true,
        userData: user,
        message: "Login successful"
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
      const { profilePic, bio, fullName } = req.body;
      const { userId } = req.params; 
  
      let updatedData = { bio, fullName };
  
      if (profilePic) {
        const upload = await cloudinary.uploader.upload(profilePic, {
          folder: "chatbuddy-profile",
        });
        updatedData.profilePic = upload.secure_url;
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });
  
      res.status(200).json({
        success: true,
        updatedUser,
        message: "Profile updated successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Profile update failed",
      });
    }
  };
  