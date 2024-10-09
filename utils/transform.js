export const transformReportData = (data)=>{
    const result = {
        "date":data.date,
        "narration":data.narration,
        "r":{
            cash:0,
            bank:0,
            diocesan:0
        },
        "p":{
            cash:0,
            bank:0,
            diocesan:0
        }
    }
    const amount = data.amount 

    if(data.rp.toLowerCase() === "receipt"){
       result.r[data.transactionMode.toLowerCase()] = amount
    }else{
        result.p[data.transactionMode.toLowerCase()] = amount
    }
    return result
}

