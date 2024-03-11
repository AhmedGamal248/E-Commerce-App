import joi from 'joi'


const addAdressVal = joi.object({
    street: joi.string().trim().required(),
    phon: joi.string().trim().required(),
    city: joi.string().trim().required()
})



const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateAdressVal = joi.object({
    id: joi.string().hex().length(24).required(),

    street: joi.string().trim(),
    phon: joi.string().trim(),
    city: joi.string().trim()
})


export {
    addAdressVal,
    paramsIdVal,
    updateAdressVal
}