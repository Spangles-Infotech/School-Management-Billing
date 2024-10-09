import { User } from "../models/auth.model.js";
import { sendCreateMessage, sendError, sendMessage } from "../utils/function.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
dotenv.config()

export const register = async (req,res)=>{
    try {
        const {userName, password, name, phoneNumber, accessTo, role="User"} = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);
        const existingUser = await User.findOne({userName:userName})
        if(existingUser){
            return sendMessage(res,"User already found. Please login")
        }
        await User.create({userName:userName, name:name, password:hashedPassword, phoneNumber:phoneNumber, accessTo:accessTo, role:role})
        return sendCreateMessage(res,"User created successfully")
    } catch (error) {
        sendError(res,error)
    }
}

export const login = async (req,res)=>{
    try {
        const {userName, password} = req.body;
        const existingUser = await User.findOne({userName:userName})
        const isPassword = await bcrypt.compare(password, existingUser.password)
        
        if (!existingUser) return sendMessage(res,"Please register")
        if (!isPassword) return sendMessage(res,"please check your password")

        const token = jwt.sign({id:existingUser._id}, process.env.SECRET_KEY)
        await User.findByIdAndUpdate(existingUser._id, { currentToken: token });
        return sendCreateMessage(res,"Login successfully",token)
    } catch (error) {
        sendError(res,error)
    }
}