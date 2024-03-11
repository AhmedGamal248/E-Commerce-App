import express from 'express'
import { validation } from '../../middelware/validation.js'
import { uploadSingleFile } from '../../services/fileUploads/fileUpload.js'
import { addSubCategoryVal, paramsIdVal, updateSubCategoryVal } from './subCategory.validation.js'
import { addSubCategory, deleteSubCategory, getAllSubCategorys, getSingleSubCategory, updateSubCategory } from './subCategory.controler.js'

const subCategoryRouter = express.Router({mergeParams:true})

subCategoryRouter
.route('/')
.post(validation(addSubCategoryVal),addSubCategory)
.get(getAllSubCategorys)

subCategoryRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleSubCategory)
.put(validation(updateSubCategoryVal),updateSubCategory)
.delete(validation(paramsIdVal),deleteSubCategory)


export {
    subCategoryRouter
}