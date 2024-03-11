import mongoose from "mongoose";

const schema =new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'the category name used'],
        trim:true,
        require:true,
        minLength:[2,'too short category name']
    },
    slug:{
        type:String,
        require:true,
        lowercase:true
    },
    image:String,
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
},{timestamps:true})

schema.post('init',function(el){
    el.image = 'http://localhost:3000/uploads/'+el.image
})

export const categoryModel = mongoose.model('category',schema)