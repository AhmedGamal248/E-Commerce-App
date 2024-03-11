import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema =new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        minLength:[2,'too short  user name']
    },
    email:{
        type:String,
        trim:true,
        require:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
    },
    isActive: {
        type: Boolean,
        default:true
    },
    isBlocked: {
        type: Boolean,
        default:false
    },
    connfirmEmail: {
        type: Boolean,
        default:false
    },
    role: {
        type:String,
        enum:['user','admin'],
        default: "user",
        lowercase:true
    },
    passwordChangedAt:Date,
    wishList:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'prduct'
        }
    ],
    addresses : [
        {
            street:String,
            phon:String,
            city:String
        }
    ]


},{timestamps:true})

//hash password signUp
schema.pre('save',function () {
    if (this.password) this.password = bcrypt.hashSync(this.password,10)
})

//hash password update
schema.pre('findOneAndUpdate',function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password,10)
})

export const userModel = mongoose.model('user',schema)