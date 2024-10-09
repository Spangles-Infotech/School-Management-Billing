import express from "express";
import { user } from "../controllers/user.controller.js";

export const userRouter = express.Router()

userRouter.get("/getAllUser", user)
userRouter.get("/getUserById/:userId", user)
userRouter.put("/updateUser/:userId", user)
userRouter.delete("/deleteUser/:userId",user)