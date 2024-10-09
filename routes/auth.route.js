import express from "express";
import { login, register } from "../controllers/auth.controller.js";

export const authRouter = express.Router()

authRouter.post("/addUser", register)
authRouter.post("/login", login)

