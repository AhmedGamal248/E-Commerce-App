import { userModel } from "../../../databases/models/user.model.js"
import { sendEmails } from "../../services/emails/sendEmail.js"
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken"
import { appError } from "../../utils/appError.js"

const signUp = async (req,res)=> {
    let user = new userModel(req.body)
    await user.save()
    const token = Jwt.sign({email:user.email,ID: user._id},'ay7aga')
    sendEmails(req.body.email)
    res.json({message:'success',token})
}

const verifyEmail = async (req,res) => {
    Jwt.verify(req.params.token,'ay7aga',async (err,decoded)=> {
        if(err) return res.json(err)
        await userModel.findOneAndUpdate({email:decoded.email},{connfirmEmail:true})
    res.json({message:'success'})
    })
}

const signIn = async (req,res)=> {
    const user = await userModel.findOne({email:req.body.email})
    if (user && bcrypt.compareSync(req.body.password,user.password)){
        const token = Jwt.sign({email:user.email,ID: user._id},'ay7aga')
        return res.json({message:"success",token})
    } 
    else {
        res.json({message:'incorrect email or password'})
    }
}


const changePassword = async (req,res)=> {
    const user = await userModel.findById(req.user._id)
    if (user && bcrypt.compareSync(req.body.password,user.password)){ 
        const token = Jwt.sign({role:user.role,ID: user._id},'ay7aga')
        await userModel.findByIdAndUpdate(req.user._id,{password:req.body.newPassword , passwordChangedAt:Date.now()})
        return res.json({message:"success",token})
    } 
    else {
        res.json({message:'incorrect email or password'})
    }
}


const protectedRoutes = async (req,res,next)=> {
  
    let token = req.headers.token
    if (!token) return res.json({message:'token must be provided'})
    let decoded = Jwt.verify(token,'ay7aga')
    let user = await userModel.findById(decoded.ID)
    if (!user) return res.json({message:' user not found'})
    if(user.passwordChangedAt) {
        let passChangedTime = parseInt(user?.passwordChangedAt.getTime()/1000 )
        if (passChangedTime>decoded.iat) return res.json({message:'invalid token please login again'})
    }

    req.user = user

    next()
}

const allowedTo = (...roles) => {
    return async(req,res,next) => {
        if (roles.includes(req.user.role)) {
            next()
        } else {
           next(new appError('you are not authorized',401)) 
        } 
    }     
}

export {
    signUp,
    signIn,
    verifyEmail,
    changePassword,
    protectedRoutes,
    allowedTo
}