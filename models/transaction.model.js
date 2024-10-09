import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
    {
        cash:{type:Number},
        bank:{type:Number},
        diocesan:{type:Number},
    }
)
export const Transaction = mongoose.model("Transaction", transactionSchema)