import { OpeningBalance } from "../models/openingBalance.model.js"
import { Transaction } from "../models/transaction.model.js"
import { getData, getTotalData, sendCreateMessage, sendError, sendMessage, setQuery} from "../utils/function.js"
import { addTransaction, fetchHeadAccountAmount, updateTransaction } from "./transaction.controller.js"

export const openingBalance = async(req, res)=>{
    try {
        const {date, accountHead: headAccount} = req.body
        const openingBalanceId = req.params.openingBalanceId
        const {accountHead, subAccountHead, from, to,page, limit} = req.query
        const updatedDate = new Date(date + " UTC")
        const exisitingBalance = await OpeningBalance.findOne({accountHead:headAccount, isDeleted:false}) 
        const menus = [ {"accountHead":accountHead, "subAccountHead":subAccountHead}]
        
        
        let query = {}
        const search = ""
        const searchItems = []
        if(req.method === "POST"){
                if(exisitingBalance){
                    await OpeningBalance.findByIdAndUpdate(exisitingBalance._id, {isDeleted:true}, {new:true})
                }
                const transaction  = await addTransaction(req.body)
                await OpeningBalance.create({...req.body, amount: transaction, date:updatedDate})
                return sendCreateMessage(res, "data created successfully")
        }  
        if(req.method === "GET"){
                if(openingBalanceId){
                    const data = await OpeningBalance.findById(openingBalanceId).populate("amount")
                    return sendMessage(res, data)
                }
                setQuery(menus, from, to, query, search, searchItems, true)
                const total = await getTotalData(OpeningBalance, query)
                const data = await getData(OpeningBalance, query, page, limit, false)
                return res.status(200).json({data:data, total:total})
        }  
        if(req.method === "PUT"){
            const openingBalance = await OpeningBalance.findByIdAndUpdate(openingBalanceId, {...req.body,date:updatedDate }, {new:true})
            await updateTransaction(openingBalance.amount, req.body)
            
            return sendMessage(res, "data updated successfully", openingBalance)
        }
    } catch (error) {
        return sendError(res, error)
    }
}

export const getTotalTransaction = async(req,res)=>{
    try {
        const totalAmount = await Transaction.aggregate([
            {
                $group:{
                    _id:null,
                    totalCash:{$sum:"$cash"},
                    totalBank:{$sum:"$bank"},
                    totalDiocesan:{$sum:"$diocesan"}
                }
            }
        ])
        return res.status(200).json(totalAmount)
    } catch (error) {
        return sendError(res, error)
    }
}

export const getAccountHeadAmount = async (req,res) => {
    try {
        const {accountHead} = req.params
        const data = await fetchHeadAccountAmount(accountHead)
        return res.status(200).json(data)

    } catch (error) {
        return sendError(res,error)
    }
}