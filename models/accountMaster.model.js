import mongoose from "mongoose";

const masterSchema = mongoose.Schema(
    {
        accountHead:{
            type:String
        },
        subAccountHead:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

export const AccountMaster = mongoose.model("AccountMaster", masterSchema)