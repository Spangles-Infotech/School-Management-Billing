import { OpeningBalance } from "../models/openingBalance.model.js"
import { Transaction } from "../models/transaction.model.js"
import { sendError } from "../utils/function.js"


export const addTransaction = async (body) => {
    try {
        const transaction = await Transaction.create(body)
        return transaction._id
    } catch (error) {
        return sendError(res, error)
    }
}

export const updateTransaction = async (id, body,) => {
    console.log("id", id, body)
    const transaction = await Transaction.findByIdAndUpdate(id, body, {new:true})
    console.log("transaction", transaction)
    return transaction._id
    
}
export const fetchHeadAccountAmount = async(accountHead)=>{
    return await OpeningBalance.findOne({accountHead:accountHead, isDeleted:false}).populate("amount")
}