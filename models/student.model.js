import mongoose from "mongoose";

const studentSchema =new mongoose.Schema(
    {
        emisId:{ type:String },
        admissionNumber:{type:String},
        name:{ type:String, index:"text" },
        nameInTamil:{ type:String },
        class:{ type:String, index:"text" },
        section:{ type:String, index:"text" },
        fatherName:{ type:String },
        fatherTamilName:{ type:String },
        motherName:{ type:String },
        motherTamilName:{ type:String },
        aadharNumber:{type:String},
        phoneNumber:{type:String},
        gender:{type:String, index:"text"},
        dob:{type:Date},
        doj:{type:Date},
        address:{type:String},
        pincode:{type:String},
        bloodGroup:{type:String},
        religion:{type:String},
        moi:{type:String},
        community:{type:String},
        groupCode:{type:String},
        disabilityName:{type:String},
        motherTongue:{type:String},
        bankAccount:{type:String},
        ifscCode:{type:String},
        micr:{type:String},
        tcNumber:{type:String},
        tcStatus:{type:String},
        tcIssueDate:{type:Date},
        studentImg:{type:String}
    },{
        timestamps :true
    }
)

export const Student = mongoose.model("Student", studentSchema)
