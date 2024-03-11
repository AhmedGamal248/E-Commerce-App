import mongoose from "mongoose";

export const DBconnection = () => {
    // mongoose.connect('mongodb://127.0.0.1:27017/E-CommerceDB').then(()=>{
        mongoose.connect(process.env.DATA_BASE).then(()=>{
        console.log('database connected successfuly...')
    }).catch((err)=>{
        console.log('database err connection',err)
    })
} 