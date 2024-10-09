import { Journal } from "../models/journal.model.js"
import { getData, getTotalData, ReceiptPaymentCalculation, sendCreateMessage, sendError, sendErrorWithCode, sendMessage, setQuery } from "../utils/function.js"
import { fetchHeadAccountAmount } from "./transaction.controller.js"

export const journalEntry = async (req,res) => {
    let query = {}
    const {journalId} = req.params
    const {date, rp :RP, transactionMode :mode, amount, accountHead :headAccount} = req.body
    const {accountHead, subAccountHead, rp, transactionMode, page,limit, from, to, search} = req.query
    const updatedDate = new Date(date + " UTC")
    const menus =[{"accountHead":accountHead, "subAccountHead":subAccountHead, "rp":rp, "transactionMode":transactionMode  }] 
    const searchItems = ["narration", "amount"]
    try {
        if(req.method === "POST"){
            const journal = await Journal.create({...req.body, date:updatedDate})
            console.log("jour", journal.length === 0)
            if(journal.length === 0){
                return sendErrorWithCode(res, 500, "got some issues")
            }
            const data = await fetchHeadAccountAmount(headAccount)
            await ReceiptPaymentCalculation(RP, mode,data.amount, amount)
            return sendCreateMessage(res,"data created successfully")   
        }
        if(req.method === "GET"){
            if(journalId){
                const journal = await Journal.findById(journalId)
                return res.status(200).json({data:journal})
            }
            setQuery(menus, from, to, query, search, searchItems, true)
            console.log("query",query)
            const total = await getTotalData(Journal, query)
            const data = await getData(Journal, query, page, limit, false)
            return res.status(200).json({data:data, total:total})
        }
        if(req.method === "PUT"){
            const journal = await Journal.findByIdAndUpdate(journalId, req.body, {new:true})
            return sendMessage(res, "Data updated Successfully", journal)
        }
    } catch (error) {
        return sendError(res,error)
    }
}