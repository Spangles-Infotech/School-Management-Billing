import { updateTransaction } from "../controllers/transaction.controller.js"

export const sendError = (res,err)=>{
    res.status(500).json({"message":err.message})
}
export const sendCreateMessage = (res,msg, item)=>{
    res.status(201).json({"message":msg, item})
}
export const sendMessage = (res,msg,data)=>{
    res.status(200).json({"message":msg, data})
}
export const sendErrorWithCode = (res,err, status)=>{
    res.status(status).json({"message":err})

}

// function will match the search input with all the search item
export const buildSearchQuery = (search, query, searchItems)=>{
    if (search && search !== "") {
        const searchQuery = new RegExp(search, 'i');
        query.$or = searchItems
            .map(item => ({ [item]: searchQuery }));
            // th{item}
    }
}

// export const convertDateToISO = (dateString) => {
//     const parts = dateString.split('/');
//     const day = parseInt(parts[0], 10); 
//     const month = parseInt(parts[1], 10) - 1; 
//     const year = parseInt(parts[2], 10); 

//     const date = new Date(Date.UTC(year, month, day));
//     console.log("date",date)
//     return date.toISOString(); 
// }

// this will convert the date to iso format and then add to the query

export const getDateQuery = (from, to,query, isDate=false) =>{
    if(from && to && from !== "" && to !== "") {
        if(isDate)return query.date = {"$gte":new Date(from) , "$lt":new Date(to)}
        // query.created_on = {"$gte":convertDateToISO(from) , "$lt":convertDateToISO(to)}
        query.createdAt = {"$gte":new Date(from) , "$lt":new Date(to)}
    }
    
}

// this is return the total count of the data
export const getTotalData = async(Model, query)=>{
    return await Model.countDocuments(query)
}

export const skipValue = (page, limit)=>{
    return (page - 1) * limit
}

// function gets the model with other as parameters and return the data
export const getData = async (Model, query, page, limit, isAmount) => {
    const skip = skipValue(page, limit);
    let queryBuilder = Model.find(query).sort({ date: -1 }).limit(limit).skip(skip);
    if (isAmount) {
        queryBuilder = queryBuilder.populate("amount");
    }
    return await queryBuilder;
}

export const setQuery = (menus,from,to,query,search,searchItems,isDate) =>{
    menus.forEach((menu) => {
        if (menu) {
            for (const key in menu) {
                if (menu.hasOwnProperty(key) && menu[key] !== undefined || null) {
                    query[key] = menu[key]; 
                }
            }
        }
    });
    if(from !=="" && to !== ""){
        getDateQuery(from,to,query, isDate )
    }
    if(search && search !== ""){
        buildSearchQuery(search,query, searchItems)
    }
}

export const ReceiptPaymentCalculation = async(rp, transactionMode, totalAmount, amount)=>{
    console.log("amount",amount)
    if(rp.toLowerCase() === "receipt"){
        updateAmountCalculation(transactionMode, totalAmount, amount,totalAmount._id, true)
    }else if(rp.toLowerCase() === "payment"){
        updateAmountCalculation(transactionMode, totalAmount, amount,totalAmount._id, false)
    }
}

const updateAmountCalculation = async (transactionMode, totalAmount, amount, transactionId, isReceipt) => {
    const mode = transactionMode.toLowerCase();

    if (['cash', 'bank', 'diocesan'].includes(mode)) {
        totalAmount[mode] += isReceipt ? amount : -amount;
        const updatedData  = {[mode]:totalAmount[mode]}
        const data = await updateTransaction(transactionId, updatedData)
        return data
    }

    throw new Error('Invalid transaction mode');
};