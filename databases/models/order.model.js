import mongoose from "mongoose";

const schema =new mongoose.Schema({
    user: {
        type:mongoose.Types.ObjectId,
        ref: 'user'
    },
    orederItems: [
        {
            product:{ type:mongoose.Types.ObjectId, ref: 'prduct' },
            quantity: Number,
            price:Number
        }
    ],
    totalOrederPrice:Number,
    shippingAdress: {
        street: String,
        city: String,
        phone: String
    },
    paymentType: {
        type:String,
        enum: ['cash','card'],
        default: 'cash'    
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: Date,
    isPaid:{
        type: Boolean,
        default: false
    },
    paidAt: Date,
},{timestamps:true})


export const orderModel = mongoose.model('order',schema)