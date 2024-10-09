import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    userName:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    token:{
        type:String
    },
    role:{
        type:String
    },
    accessTo: {
        isStudent: { type: Boolean, default: false },
        isTransaction: { type: Boolean, default: false },
        isAccountView: { type: Boolean, default: false },
        isReports: { type: Boolean, default: false },
        isAccountMaster: { type: Boolean, default: false }
    }
})

export const User = mongoose.model('User', userSchema )
