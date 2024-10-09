import express from "express"
import { accountView } from "../controllers/accountView.controller.js"

export const accountViewRouter = express.Router()

accountViewRouter.post("/addAccountView", accountView)
accountViewRouter.get("/getAllAccountView", accountView)
accountViewRouter.get("/getAccountViewById/:accountViewId", accountView)
accountViewRouter.put("/updateAccountView/:accountViewId", accountView)
