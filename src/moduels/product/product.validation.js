import joi from 'joi'


const addProductVal = joi.object({
    title: joi.string().min(2).max(100).trim().required(),
    description: joi.string().min(2).max(500).trim().required(),
    price: joi.number().min(0).required(),
    priceAfterDiscount: joi.number().min(0),
    quantity: joi.number().min(0),
    category: joi.string().hex().length(24),
    subCategory: joi.string().hex().length(24),
    brand: joi.string().hex().length(24),
    createdBy: joi.string().hex().length(24),

    imgCover: joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype: joi.string().valid('image/webp','image/png', 'image/jpeg','image/jpg', 'image/gif').required(),
        destination:joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(1000000).required()
        })).required(),
    
        images: joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype: joi.string().valid('image/webp','image/png', 'image/jpeg','image/jpg', 'image/gif').required(),
        destination:joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(1000000).required()
        })).required(),

   
})



//***************************************************************** */


const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateProductVal = joi.object({
    id: joi.string().hex().length(24).required(),
    title: joi.string().min(2).max(100).trim(),
    description: joi.string().min(2).max(500).trim().required(),
    price: joi.number().min(0),
    priceAfterDiscount: joi.number().min(0),
    quantity: joi.number().min(0),
    category: joi.string().hex().length(24),
    subCategory: joi.string().hex().length(24),
    brand: joi.string().hex().length(24),
    createdBy: joi.string().hex().length(24),

    imgCover: joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype: joi.string().valid('image/webp','image/png', 'image/jpeg','image/jpg', 'image/gif').required(),
        destination:joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(1000000).required()
        })),
    
        images: joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype: joi.string().valid('image/png', 'image/jpeg', 'image/webp','image/jpg', 'image/gif').required(),
        destination:joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(1000000).required()
        })),
})


export {
    addProductVal,
    paramsIdVal,
    updateProductVal
}