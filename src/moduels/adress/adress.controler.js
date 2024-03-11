import { userModel } from "../../../databases/models/user.model.js"
import { catchError } from "../../middelware/catchError.js"
import { appError } from "../../utils/appError.js"


const addAdress = catchError(async (req,res)=> {

    let adress = await userModel.findByIdAndUpdate(req.user._id ,
        {$addToSet: {addresses: req.body}},{new: true})
    !adress && next (new appError ('adress not found',404))
    adress && res.json({message:'success',adress: adress.addresses})
})


const removFromAdresses = catchError(async (req,res,next)=> {

    let adress = await userModel.findByIdAndUpdate(req.user._id ,
        {$pull: {addresses: {_id: req.params.id} }},{new: true})
    !adress && next (new appError ('adress not found',404))
    adress && res.json({message:'success',adress:adress.addresses})
})


const getLogedUserAdresses = catchError(async (req,res,next)=> {

    let {addresses} = await userModel.findById(req.user._id  )
    addresses && res.json({message:'success',addresses})
})


export {
    addAdress,
    removFromAdresses,
    getLogedUserAdresses
}