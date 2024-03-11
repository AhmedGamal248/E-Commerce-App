import express from 'express'
import { validation } from '../../middelware/validation.js'
import { uploadSingleFile } from '../../services/fileUploads/fileUpload.js'
import { addBrandVal, paramsIdVal, updateBrandVal } from './brand.validation.js'
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from './brand.controler.js'

const brandRouter = express.Router()

brandRouter
.route('/')
.post(uploadSingleFile('logo') ,validation(addBrandVal),addBrand)
.get(getAllBrands)

brandRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleBrand)
.put(uploadSingleFile('logo') ,validation(updateBrandVal),updateBrand)
.delete(validation(paramsIdVal),deleteBrand)


export {
    brandRouter
}