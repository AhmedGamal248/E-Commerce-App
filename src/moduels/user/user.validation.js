import joi from "joi";

const addUserValidation = joi.object({
    name:joi.string().required().min(2).max(20),
    email:joi.string().required().email(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required(),
    rePassword:joi.valid(joi.ref('password')).required(),
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const UpdateUserValidation = joi.object({
    id:joi.string().hex().length(24).required(),
    name:joi.string().min(2).max(20),
    email:joi.string().email(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/),
    role: joi.string().valid('user','admin')
})

export {
    addUserValidation,
    paramsIdVal,
    UpdateUserValidation
}
