import joi from 'joi'

const signUpSchemaValidation = joi.object({
    name:joi.string().required().min(2).max(20),
    email:joi.string().required().email(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required(),
    rePassword:joi.valid(joi.ref('password')).required(),
    age:joi.number().integer().required().min(12),
}
)

//signIn schema validation
const signInSchemaValidation = joi.object({
    email:joi.string().required().email(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required(),
}
)   

//change password schema validation
const changePasswordVal = joi.object({
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required(),
    newPassword:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required()
}
)   

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


export {
    signUpSchemaValidation,
    signInSchemaValidation,
    changePasswordVal 
}