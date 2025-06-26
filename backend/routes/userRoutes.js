import express from "express";
import { login, signup, updateProfile } from "../Controllers/userController";

const userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile/:userId", updateProfile);

export default userRouter;
