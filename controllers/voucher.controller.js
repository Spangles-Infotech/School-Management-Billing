import { Voucher } from "../models/voucher.model.js"
import { updateAmountByVoucherAmount } from "../utils/calculation.js"
import { sendCreateMessage, sendError, getDataWithCreatedAt, getTotalData, setQuery, sendMessage } from "../utils/function.js"


export const voucher = async (req, res)=>{
    let query = {}
    const voucherId = req.params.voucherId
    const {accountHead:headAccount, bank, cash} = req.body
    const {accountHead, search, page, limit} = req.query
    const menus = [{"accountHead": accountHead}]
    const searchItems = ["cash", "bank", "voucherNo", "remarks"]

    try {
        if(req.method === "POST"){
            console.log("req",req.body)
            await Voucher.create(req.body)
            const transaction = await updateAmountByVoucherAmount(headAccount, bank, cash)
            return sendCreateMessage(res, "Data created successfully", transaction)
        }
        if(req.method === 'GET'){
            if(voucherId){
                const data = await Voucher.findById(voucherId)
                return res.status(200).json({data:data})
            }
            setQuery(menus, "", "",query, search, searchItems)
            const total = await getTotalData(Voucher, query)
            const data = await getDataWithCreatedAt(Voucher, query, page,limit, false)
            return res.status(200).json({data:data, total:total})
        }
        if(req.method === "PUT"){
            const exisingVoucher = await Voucher.findById(voucherId)
            if(exisingVoucher.cash !== cash || exisingVoucher.bank !== bank){
                await updateAmountByVoucherAmount(headAccount, exisingVoucher.bank, exisingVoucher.cash, true)
            }
            const data = await Voucher.findByIdAndUpdate(voucherId, req.body, {new: true})
            if(exisingVoucher.cash !== cash || exisingVoucher.bank !== bank){
                await updateAmountByVoucherAmount(headAccount, bank, cash,)
            }
            return sendMessage(res, "Data updated successfully",data)
        }
    } catch (error) {
        return sendError(res, error)

    }
}