import express from "express";
import { reports } from "../controllers/reports.controller.js";

export const reportsRouter = express.Router()

reportsRouter.get("/getAllReports", reports)