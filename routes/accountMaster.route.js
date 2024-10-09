import express from "express";
import { accountMaster } from "../controllers/accountMaster.controller.js";

export const masterRouter = express.Router()

masterRouter.post("/addAccountMaster", accountMaster)
masterRouter.get("/getAccountMaster", accountMaster)
masterRouter.put("/updateAccountMaster/:id", accountMaster)