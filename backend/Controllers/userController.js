import User from "../models/userModel.js";

export const signup = async (req, res) => {
  const { fullName, bio, profilePic } = req.body;

  if (!fullName) {
    return res.status(400).json({ success: false, message: "Name is required" });
  }

  try {
    const newUser = new User({ fullName, bio, profilePic });
    await newUser.save();
    res.status(201).json({ success: true, userData: newUser , message: "Account created successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
