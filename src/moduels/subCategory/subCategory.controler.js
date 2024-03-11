import slugify from 'slugify'
import { catchError } from "../../middelware/catchError.js"
import { subCategoryModel } from '../../../databases/models/subCategory.model.js'
import { ApiFeatures } from '../../utils/apiFeatures.js'

const addSubCategory = catchError(async (req,res)=> {
    req.body.slug = slugify(req.body.name)
    let subCategory = new subCategoryModel(req.body)
    await subCategory.save()
    res.json({message:'success',subCategory})
    })


const getAllSubCategorys = catchError(async(req,res)=> {
    let apiFeatures = new ApiFeatures(subCategoryModel.find(),req.query)
   .sort().fields().filteration().pagination().search()

    let subCategores = await apiFeatures.mongooseQuery;
    res.json({ massage: "successs",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, subCategores });
   })


const getSingleSubCategory = catchError(async (req,res)=> {
    let SubCategory = await subCategoryModel.findById(req.params.id)
    !SubCategory && res.status(404).json({message:'category not found'})
    SubCategory && res.json({message:'success',SubCategory})
    
})


const updateSubCategory = catchError(async (req,res)=> {
    req.body.slug = slugify(req.body.name)
    let SubCategory = await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
    !SubCategory && res.status(404).json({message:'category not found'})
    SubCategory && res.json({message:'success',SubCategory})
})



const deleteSubCategory = catchError(async (req,res)=> {
    let SubCategory = await subCategoryModel.findByIdAndDelete(req.params.id)
    !SubCategory && res.status(404).json({message:'category not found'})
    SubCategory && res.json({message:'success',SubCategory})
})

export {
    addSubCategory,
    getAllSubCategorys,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory
}