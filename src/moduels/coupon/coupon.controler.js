import { couponModel } from "../../../databases/models/coupon.model.js"
import { catchError } from "../../middelware/catchError.js"
import { ApiFeatures } from '../../utils/apiFeatures.js'
import { appError } from "../../utils/appError.js"

const addCoupon = catchError(async (req,res,next)=> {

    let foundCoupon = await couponModel.findOne({ code: req.body.code})

    if (foundCoupon) return next(new appError ('coupon is already Exist'))

    let coupon = new couponModel(req.body)
    await coupon.save()
    res.json({message:'success',coupon})

    })


const getAllCoupons = catchError(async(req,res)=> {
    let apiFeatures = new ApiFeatures(couponModel.find(),req.query)
   .sort().fields().filteration().pagination().search()

    let coupons = await apiFeatures.mongooseQuery;
    res.json({ massage: "successs",page: apiFeatures.pageNum ,next_page:apiFeatures.nexP, coupons });
   })


const getSingleCoupon = catchError(async (req,res)=> {
    let coupon = await couponModel.findById(req.params.id)
    !coupon && res.status(404).json({message:'coupon not found'})
    coupon && res.json({message:'success',coupon})
    
})


const updateCoupon = catchError(async (req,res)=> {

    let coupon = await couponModel.findByIdAndUpdate(req.params.id ,req.body,{new: true})
    !coupon && res.status(404).json({message:'coupon not found'})
    coupon && res.json({message:'success',coupon})
})



const deleteCoupon = catchError(async (req,res)=> {
    let coupon = await couponModel.findByIdAndDelete(req.params.id)
    !coupon && res.status(404).json({message:'coupon not found'})
    coupon && res.json({message:'success',coupon})
})

export {
    addCoupon,
    getAllCoupons,
    getSingleCoupon,
    updateCoupon,
    deleteCoupon
}