import express from "express";
import { student } from "../controllers/student.controller.js";

export const studentRouter = express.Router();

studentRouter.get("/getAllStudent", student)
studentRouter.post("/addStudent", student)
studentRouter.get("/getStudentById/:studentId", student)
studentRouter.put("/updateStudent/:studentId", student)