import mongoose from "mongoose";

const schema =new mongoose.Schema({
    title:{
        type:String,
        unique:[true,'the product name used'],
        trim:true,
        require:true,
        minLength:[2,'too short product name']
    },
    slug:{
        type:String,
        require:true,
        lowercase:true
    },
    description:{
        type:String,
        trim:true,
        require:true,
        minLength:[10,'too short product description'],
        maxLength:[500,'too long product description']
    },
    imgCover:String,
    images:[],
    price:{
        type:Number,
        require:true,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        require:true,
        min:0
    },
    quantity:{
        type:Number,
        min:0,
        default:0
    },
    sold:Number,
    reatAvg: {
        type:Number,
        max:5,
        min:0
    },
    reteCount: Number,
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'subCategory'
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
},{timestamps:true , toJSON:{virtuals: true}})


schema.virtual('myReviews',{
    ref:'review',
    localField:'_id',
    foreignField:'product',
})

schema.pre('findOne',function(){
    this.populate('myReviews')
})

schema.post('init',function(el){
    if(el.imgCover) el.imgCover = 'http://localhost:3000/uploads/'+el.imgCover
    if(el.images) el.images = el.images.map((img)=>'http://localhost:3000/uploads/'+img)
})

export const productModel = mongoose.model('prduct',schema)