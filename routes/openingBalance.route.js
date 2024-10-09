import express from "express";
import { getAccountHeadAmount, getTotalTransaction, openingBalance } from "../controllers/openingBalance.controller.js";

export const openingBalanceRouter = express.Router()

openingBalanceRouter.post("/addOpeningBalance", openingBalance)
openingBalanceRouter.get("/getAllOpeningBalance", openingBalance)
openingBalanceRouter.get("/getOpeningBalanceById/:openingBalanceId", openingBalance)
openingBalanceRouter.put('/updateOpeningBalance/:openingBalanceId', openingBalance)
openingBalanceRouter.get("/getTotalAmount", getTotalTransaction)
openingBalanceRouter.get("/getAccountHeadAmount/:accountHead", getAccountHeadAmount)