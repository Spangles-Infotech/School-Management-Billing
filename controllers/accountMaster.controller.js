import { AccountMaster } from "../models/accountMaster.model.js"
import { buildSearchQuery, getDateQuery, getTotalData, sendError, sendMessage } from "../utils/function.js"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../utils/variable.js"


export const accountMaster = async(req,res)=>{
    const {search, accountHead, date,from, to, page=DEFAULT_PAGE,limit = DEFAULT_LIMIT} = req.query
    const {id} = req.params
    const skipValue = (page - 1) * limit;
    const searchItems = ["subAccountHead"]
    let query = {}
    
    if(accountHead && accountHead !== "") query.accountHead = accountHead
    if(date && date !== "") query.date = date
   
    buildSearchQuery(search, query, searchItems) 
    getDateQuery(from,to, query) 
    
    try {
        if(req.method === "POST"){
            await AccountMaster.create(req.body)
            return sendMessage(res, "data created successfully")
        }
        if(req.method === "GET"){
            const total = await getTotalData(AccountMaster, query)
            const data = await AccountMaster.find(query)
            .sort({createdAt : -1 })
            .limit(limit)
            .skip(skipValue)
            return res.status(200).json({ data: data, total: total });
        }
        if(req.method === "PUT"){
            const data = await AccountMaster.findByIdAndUpdate(id, req.body, {new:true})
            return sendMessage(res, "updated successfully", data)
        }
        if(req.method === "DELETE"){
            await AccountMaster.findByIdAndDelete(id)
            return sendMessage(res, "Data deleted successfully")
        }
    } catch (error) {
        return sendError(res, error)
    }
}