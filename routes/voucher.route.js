import express from "express"
import { voucher } from "../controllers/voucher.controller.js"

export const voucherRouter = express.Router()

voucherRouter.post("/addVoucher", voucher)
voucherRouter.get("/getAllVoucher", voucher)
voucherRouter.get("/getVoucherById/:voucherId", voucher)
voucherRouter.put("/updateVoucher/:voucherId",voucher )