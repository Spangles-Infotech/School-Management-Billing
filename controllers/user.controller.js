import { User } from "../models/auth.model.js"
import { buildSearchQuery, getDataWithCreatedAt, getTotalData, sendError, sendMessage } from "../utils/function.js"

export const user = async (req,res) => {
    let query = {}
    const userId = req.params.userId
    const {search, page, limit} = req.query
    const searchItems = ['name', "f", "phoneNumber"]
    try {
        if(req.method === "GET"){
            if(userId){
                const data  =  await User.findById(userId)
                return res.status(200).json({data:data})
            }
            buildSearchQuery(search, query, searchItems)
            const total = await getTotalData(User, query)
            const data = await getDataWithCreatedAt(User, query, page, limit)
            return res.status(200).json({data:data,total:total})
        }
        if(req.method === "PUT"){
            console.log("userId")
            const user = await User.findByIdAndUpdate(userId, req.body, {new:true})
            return sendMessage(res, "User updated successfully", user)
        }
        if(req.method === "DELETE"){
            const user = await User.findByIdAndDelete(userId)
            return sendMessage(res, "User Deleted successfully", user)
        }
    } catch (error) {
        return sendError(res, error)
    }
}