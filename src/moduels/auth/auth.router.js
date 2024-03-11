import express from 'express'
import { validation } from '../../middelware/validation.js'
import { changePasswordVal, signInSchemaValidation, signUpSchemaValidation } from './auth.validation.js'
import { allowedTo, changePassword, protectedRoutes, signIn, signUp, verifyEmail } from './auth.controler.js'
import { chkEmlEx } from '../../middelware/checkEmailExest.js'

const authRouter = express.Router()

authRouter.post('/signUp',validation(signUpSchemaValidation),chkEmlEx,signUp)
authRouter.post('/signIn',validation(signInSchemaValidation),signIn)
authRouter.get('/verify/:token',verifyEmail)
authRouter.patch('/changePassword',protectedRoutes,validation(changePasswordVal),changePassword)




export {
    authRouter
}