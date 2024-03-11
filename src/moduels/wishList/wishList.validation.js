import joi from 'joi'


const addWishListVal = joi.object({
    product: joi.string().hex().length(24).required()
})



const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateWishListVal = joi.object({
    id: joi.string().hex().length(24).required(),
})


export {
    addWishListVal,
    paramsIdVal,
    updateWishListVal
}