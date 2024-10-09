import { Journal } from "../models/journal.model.js"
import { getData, getTotalData, sendError, setQuery } from "../utils/function.js"
import { transformReportData } from "../utils/transform.js"


export const reports = async (req,res) => {
    let query = {}
    const {rp, accountHead, subAccountHead, page, limit, from ,to,search} = req.query
    const menus =[{"accountHead":accountHead, "subAccountHead":subAccountHead, "rp":rp }] 
    const searchItems = ["narration"]
    try {
        if(req.method === "GET"){
            setQuery(menus, from, to, query, search, searchItems, true)
            const total = getTotalData(Journal, query)
            const data = await getData(Journal,query, page, limit,false)
            const reportData = await Promise.all(data.map(async (item) => {
                return await transformReportData(item);
            }));
            return res.status(200).json({data:reportData, total:total})
        }
    } catch (error) {
        return sendError(res, error)
    }
}