import mongoose from "mongoose";

const openingSchema = mongoose.Schema(
    {
        date:{
            type:Date
        },
        accountHead:{
            type:String
        },
        subAccountHead:{
            type:String
        },
        amount:{
            type:mongoose.Schema.Types.ObjectID,
            ref:"Transaction",
            required:true
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
)

export const OpeningBalance = mongoose.model("OpeningBalance", openingSchema) 