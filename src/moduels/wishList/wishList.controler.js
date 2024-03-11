import { userModel } from "../../../databases/models/user.model.js"
import { catchError } from "../../middelware/catchError.js"
import { appError } from "../../utils/appError.js"


const addToWishList = catchError(async (req,res)=> {

    let wishList = await userModel.findByIdAndUpdate(req.user._id ,
        {$addToSet: {wishList: req.body.product}},{new: true}).populate('wishList')
    !wishList && next (new appError ('wishList not found',404))
    wishList && res.json({message:'success',wishList:wishList.wishList})
})


const removFromWishList = catchError(async (req,res,next)=> {

    let wishList = await userModel.findByIdAndUpdate(req.user._id ,
        {$pull: {wishList: req.params.id}},{new: true}).populate('wishList')
    !wishList && next (new appError ('wishList not found',404))
    wishList && res.json({message:'success',wishList:wishList.wishList})
})


const getLogedUserWishList = catchError(async (req,res,next)=> {

    let {wishList} = await userModel.findById(req.user._id  )
    !wishList && next (new appError ('wishList not found',404))
    wishList && res.json({message:'success',wishList})
})


export {
    addToWishList,
    removFromWishList,
    getLogedUserWishList
}