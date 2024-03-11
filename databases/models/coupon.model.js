import mongoose from "mongoose";

const schema =new mongoose.Schema({
    code:{
        type:String,
        trim:true,
        require:true,
    },
    expires:Date,
    discount:{
        type:Number,
        require:true
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
},{timestamps:true})

export const couponModel = mongoose.model('coupon',schema)