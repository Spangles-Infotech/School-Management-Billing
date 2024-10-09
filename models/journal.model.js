import mongoose from "mongoose";

const journalschema = mongoose.Schema(
    {
        date:{type:Date},
        rp:{type:String},
        transactionMode:{type:String},
        accountHead:{type:String},
        subAccountHead:{type:String},
        amount:{type:Number},
        narration:{type:String},
        isAccountView:{type:Boolean, default:false}
    }
)

export const Journal = mongoose.model("Journal", journalschema)