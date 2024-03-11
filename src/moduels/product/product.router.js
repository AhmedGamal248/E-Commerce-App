import express from 'express'
import { validation } from '../../middelware/validation.js'
import { uploadFields, uploadSingleFile } from '../../services/fileUploads/fileUpload.js'
import { addProductVal, paramsIdVal, updateProductVal } from './product.validation.js'
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from './product.controler.js'

const productRouter = express.Router()
productRouter
.route('/')
.post(uploadFields([
    {name:'imgCover',maxCount:1},
    {name:'images',maxCount:10}
]),validation(addProductVal),addProduct)
.get(getAllProducts)

productRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleProduct)
.put(uploadFields([
    {name:'imgCover',maxCount:1},
    {name:'images',maxCount:10}
]) ,validation(updateProductVal),updateProduct)
.delete(validation(paramsIdVal),deleteProduct)


export {
    productRouter
}