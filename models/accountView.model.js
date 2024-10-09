import mongoose from "mongoose";

const accountViewSchema = mongoose.Schema({
    date:{type:Date},
    rp:{type:String},
    accountHead:{type:String},
    transactionMode:{type:String},
    amount:{type:Number}
})

export const AccountView = mongoose.model("AccountView", accountViewSchema)