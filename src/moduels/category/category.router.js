import express from 'express'
import { addcategory, deletecategory, getAllcategorys, getSingleCategory, updatecategory } from './category.controler.js'
import { validation } from '../../middelware/validation.js'
import { addCategoryVal, paramsIdVal, updateCategoryVal } from './category.validation.js'
import { uploadSingleFile } from '../../services/fileUploads/fileUpload.js'
import { subCategoryRouter } from '../subCategory/subCategory.router.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controler.js'

const categoryRouter = express.Router()

categoryRouter.use('/:category/subCategories',subCategoryRouter)

categoryRouter
.route('/')
.post(protectedRoutes,allowedTo('user','admin'),uploadSingleFile('img') ,validation(addCategoryVal),addcategory)
.get(getAllcategorys)

categoryRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleCategory)
.put(protectedRoutes,uploadSingleFile('img') ,validation(updateCategoryVal),updatecategory)
.delete(protectedRoutes,validation(paramsIdVal),deletecategory)


export {
    categoryRouter
}