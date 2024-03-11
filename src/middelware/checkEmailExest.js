import { userModel } from "../../databases/models/user.model.js"

export const chkEmlEx = async (req,res,next) => {
    const user = await userModel.findOne({email:req.body.email})
    if (user) return res.json({message:'email is already exist'})
    next()
}