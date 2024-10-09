
import { Journal } from "../models/journal.model.js"
import { ReceiptPaymentCalculation } from "../utils/calculation.js"
import { getData, getTotalData, sendCreateMessage, sendError, sendErrorWithCode, sendMessage, setQuery } from "../utils/function.js"
import { fetchHeadAccountAmount } from "./transaction.controller.js"

export const accountView = async (req, res)=>{
    try {
        let query = {isAccountView:true}
        const accountViewId = req.params.accountViewId
        const {date} = req.body
        const updatedDate = new Date(date + " UTC")
        const {accountHead, rp, transactionMode, page,limit, from, to, search} = req.query
        const menus =[{"accountHead":accountHead, "rp":rp, "transactionMode":transactionMode }] 
        const searchItems = ["narration", "amount"]
        const {accountHead:headAccount, rp:RP, transactionMode:mode, amount} = req.body
        if(req.method === "POST"){
            const accountView = await Journal.create({...req.body, date:updatedDate, isAccountView:true})
            if(accountView === 0){
                return sendErrorWithCode(res, 400, "got some issues")
            }
            const data = await fetchHeadAccountAmount(headAccount)
            await ReceiptPaymentCalculation(RP, mode,data.amount, amount)
            return sendCreateMessage(res,"data created successfully")
        }
        if(req.method === "GET"){
            if(accountViewId){
                const data = await Journal.findById(accountViewId)
                return res.status(200).json({data:data})
            }
            setQuery(menus, from, to,query, search, searchItems, true)
            const total = await getTotalData(Journal, query)
            const data = await getData(Journal, query,page,limit, false)
            return res.status(200).json({data:data, total:total})
        }
        if(req.method === "PUT"){
            const exisitingBalance = await Journal.findById(accountViewId)
            const data = await fetchHeadAccountAmount(headAccount)
            if(transactionMode !== exisitingBalance.transactionMode || amount !== exisitingBalance.amount){
                await ReceiptPaymentCalculation(exisitingBalance.rp, exisitingBalance.transactionMode, data.amount, exisitingBalance.amount, true)
            }
            const accountView = await Journal.findByIdAndUpdate(accountViewId, req.body, {new:true})
            if(transactionMode !== exisitingBalance.transactionMode || amount !== exisitingBalance.amount){
                await ReceiptPaymentCalculation(RP, mode, data.amount, amount)
            }
            return sendMessage(res, "Data updated successfully", accountView)
        }
    } catch (error) {
        return sendError(res, error)
    }
}