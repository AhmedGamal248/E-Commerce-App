import joi from 'joi'


const addToCartVal = joi.object({
    product: joi.string().hex().length(24).required(),
    quantity: joi.number().options({convert: false})
})



const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateQuantityVal = joi.object({
    id: joi.string().hex().length(24).required(),
    product: joi.string().hex().length(24).required(),
    quantity: joi.number().required()
})


export {
    addToCartVal,
    paramsIdVal,
    updateQuantityVal
}