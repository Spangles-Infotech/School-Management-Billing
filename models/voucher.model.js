import mongoose from "mongoose";

const voucherSchema = mongoose.Schema(
    {
        accountHead:{type:String},
        remarks:{type:String},
        cash:{type:Number},
        bank:{type:Number},
        voucherNo:{type:String}
    },{
        Timestamps:true
    }
)

export const Voucher = mongoose.model("Voucher", voucherSchema)