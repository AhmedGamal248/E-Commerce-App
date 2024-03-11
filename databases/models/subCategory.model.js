import mongoose from "mongoose";

const schema =new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'the sub category name used'],
        trim:true,
        require:true,
        minLength:[2,'too short sub category name']
    },
    slug:{
        type:String,
        require:true,
        lowercase:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
},{timestamps:true})

export const subCategoryModel = mongoose.model('subCategory',schema)