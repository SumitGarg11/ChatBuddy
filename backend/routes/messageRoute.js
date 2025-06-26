import express from "express";
import {
  getMessage,
  markMessageAsSeen,
  getUsersForSidebar,
} from "../Controllers/messageController.js";

const messageRouter = express.Router();

// Get all users except the logged-in user (or passed userId)
messageRouter.get("/users", getUsersForSidebar);

// Get all messages for selected user
messageRouter.get("/:id", getMessage);

// Mark a specific message as seen
messageRouter.put("/mark/:id", markMessageAsSeen);

export default messageRouter;
