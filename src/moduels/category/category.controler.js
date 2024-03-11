import { categoryModel } from "../../../databases/models/category.model.js"
import slugify from 'slugify'
import { catchError } from "../../middelware/catchError.js"
import { deleteOne, getAllDocuments } from "../handler/handler.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"

const addcategory = catchError(async (req,res)=> {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new categoryModel(req.body)
    await category.save()
    res.json({message:'success',category})
    })


const getAllcategorys = catchError(async(req,res)=> {
    let apiFeatures = new ApiFeatures(categoryModel.find(),req.query)
   .sort().fields().filteration().pagination().search()

    let categories = await apiFeatures.mongooseQuery;
    res.json({ massage: "successs",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, categories });
   })


const getSingleCategory = catchError(async (req,res)=> {
    let category = await categoryModel.findById(req.params.id)
    !category && res.status(404).json({message:'category not found'})
    category && res.json({message:'success',category})
    
})


const updatecategory = catchError(async (req,res)=> {
    if(req.body.name) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.image = req.file.filename
    let category = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
    !category && res.status(404).json({message:'category not found'})
    category && res.json({message:'success',category})
})



const deletecategory = deleteOne(categoryModel)

export {
    addcategory,
    getAllcategorys,
    getSingleCategory,
    updatecategory,
    deletecategory
}