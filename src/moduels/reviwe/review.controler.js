import { reviewModel } from "../../../databases/models/review.model.js"
import { catchError } from "../../middelware/catchError.js"
import { ApiFeatures } from '../../utils/apiFeatures.js'
import { appError } from "../../utils/appError.js"

const addReview = catchError(async (req,res,next)=> {

    req.body.user = req.user._id
    let foundReview = await reviewModel.findOne({user:req.user._id , product: req.body.product})
    if (foundReview) return next(new appError ('you already add review to this product befor'))
    let review = new reviewModel(req.body)
    await review.save()
    res.json({message:'success',review})

    })


const getAllReviews = catchError(async(req,res)=> {
    let apiFeatures = new ApiFeatures(reviewModel.find(),req.query)
   .sort().fields().filteration().pagination().search()

    let reviews = await apiFeatures.mongooseQuery;
    res.json({ massage: "successs",page: apiFeatures.pageNum ,next_page:apiFeatures.nexP, reviews });
   })


const getSingleReview = catchError(async (req,res)=> {
    let review = await reviewModel.findById(req.params.id)
    !review && res.status(404).json({message:'review not found'})
    review && res.json({message:'success',review})
    
})


const updateReview = catchError(async (req,res)=> {

    let review = await reviewModel.findOneAndUpdate({_id: req.params.id, user: req.user._id},req.body,{new: true})
    !review && res.status(404).json({message:'review not found'})
    review && res.json({message:'success',review})
})



const deleteReview = catchError(async (req,res)=> {
    let review = await reviewModel.findByIdAndDelete({_id: req.params.id, user: req.user._id})
    !review && res.status(404).json({message:'review not found'})
    review && res.json({message:'success',review})
})

export {
    addReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}