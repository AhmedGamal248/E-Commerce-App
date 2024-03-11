import slugify from 'slugify'
import { catchError } from "../../middelware/catchError.js"
import { brandModel } from '../../../databases/models/brand.model.js'
import { deleteOne, getAllDocuments } from '../handler/handler.js'
import { ApiFeatures } from '../../utils/apiFeatures.js'

const addBrand = catchError(async (req,res)=> {
    console.log(req.file)
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new brandModel(req.body)
    await brand.save()
    res.json({message:'success',brand})
    })


    //  getAllDocuments(brandModel)     
const getAllBrands = catchError(async(req,res)=> {
    let apiFeatures = new ApiFeatures(brandModel.find(),req.query)
   .sort().fields().filteration().pagination().search()

    let brands = await apiFeatures.mongooseQuery;
    res.json({ massage: "successs",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, brands });
   })

    


const getSingleBrand = catchError(async (req,res)=> {
    let brand = await brandModel.findById(req.params.id)
    !brand && res.status(404).json({message:'brand not found'})
    brand && res.json({message:'success',brand})
    
})


const updateBrand = catchError(async (req,res)=> {
    if(req.body.name) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename
    let brand = await brandModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
    !brand && res.status(404).json({message:'brand not found'})
    brand && res.json({message:'success',brand})
})



const deleteBrand = deleteOne(brandModel)

export {
    addBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand
}