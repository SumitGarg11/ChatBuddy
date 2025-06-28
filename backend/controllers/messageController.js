


// Get All users except the logged in user 

import Message from "../models/Message.js";
import User from "../models/User.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId }}).select("-password");

        // count number of messages not seen 
        const unSeenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const message = await Message.find({senderId: user._id, receiverId: userId, seen: false})
            if(message.length > 0 ){
                unSeenMessages[user._id] = message.length;
            }
        })
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unSeenMessages})
    } catch (error) {

        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}