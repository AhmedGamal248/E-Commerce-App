import joi from 'joi'


const addReviewVal = joi.object({
    text: joi.string().min(1).max(200).trim(),
    rate: joi.number().min(0).max(5).required(),
    product: joi.string().hex().length(24).required()
})



const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateReviewVal = joi.object({
    id: joi.string().hex().length(24).required(),

    text: joi.string().min(1).max(200).trim(),
    rate: joi.number().min(0).max(5),
})


export {
    addReviewVal,
    paramsIdVal,
    updateReviewVal
}