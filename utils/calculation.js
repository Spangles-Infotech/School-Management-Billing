import { fetchHeadAccountAmount, updateTransaction } from "../controllers/transaction.controller.js";

export const ReceiptPaymentCalculation = async(rp, transactionMode, totalAmount, amount, isRevert=false)=>{
    console.log("amount",amount)
    if(rp.toLowerCase() === "receipt"){
        updateAmountCalculation(transactionMode, totalAmount, amount,totalAmount._id, true, isRevert)
    }else if(rp.toLowerCase() === "payment"){
        updateAmountCalculation(transactionMode, totalAmount, amount,totalAmount._id, false, isRevert)
    }
}

const updateAmountCalculation = async (transactionMode, totalAmount, amount, transactionId, isReceipt, isRevert = false) => {
    const mode = transactionMode.toLowerCase();
    if (['cash', 'bank', 'diocesan'].includes(mode)) {
        isRevert 
        ? totalAmount[mode] += isReceipt ? -amount : amount 
        :totalAmount[mode] += isReceipt ? amount : -amount;
        const updatedData  = {[mode]:totalAmount[mode]}
        const data = await updateTransaction(transactionId, updatedData)
        console.log("data",data)
        return data
    }

};

export const updateAmountByVoucherAmount = async(accountHead, bank, cash, isAdd=false)=>{
    const data = await fetchHeadAccountAmount(accountHead)
    let amount = {}
    if(cash !== 0 && cash !== ""){
        data.amount.cash += isAdd ? cash : -cash
        amount["cash"] = data.amount.cash
    }
    if(bank !== 0 && bank !== ""){
        data.amount.bank += isAdd ? bank : -bank
        amount["bank"] = data.amount.bank
    }
    console.log("amount", amount)
    const updatedAmount = await updateTransaction(data.amount._id, amount)
    return updatedAmount
}

