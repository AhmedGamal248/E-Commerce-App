import joi from 'joi'


const addCategoryVal = joi.object({
    name: joi.string().min(2).max(100).trim().required(),
    image: joi.object({
    fieldname:joi.string().required(),
    originalname:joi.string().required(),
    encoding:joi.string().required(),
    mimetype: joi.string().valid('image/png', 'image/jpeg','image/jpg', 'image/gif').required(),
    destination:joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().max(1000000).required()
    }).required()
})


const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateCategoryVal = joi.object({
    name: joi.string().min(2).max(100).trim(),
    id: joi.string().hex().length(24).required(),
    image: joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype: joi.string().valid('image/png', 'image/jpeg','image/jpg', 'image/gif').required(),
        destination:joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(1000000)
        })
})


export {
    addCategoryVal,
    paramsIdVal,
    updateCategoryVal
}