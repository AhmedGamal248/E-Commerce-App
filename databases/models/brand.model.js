import mongoose from "mongoose";

const schema =new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'the brand name used'],
        trim:true,
        require:true,
        minLength:[2,'too short brand name']
    },
    slug:{
        type:String,
        require:true,
        lowercase:true
    },
    logo:String,
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
},{timestamps:true})

schema.post('init',function(ele){
    ele.logo = 'http://localhost:3000/uploads/'+ele.logo
})

export const brandModel = mongoose.model('brand',schema)