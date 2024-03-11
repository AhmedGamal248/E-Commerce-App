import express from 'express'
import { validation } from '../../middelware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controler.js'
import { addAdressVal, paramsIdVal } from './adress.validation.js'
import { addAdress, getLogedUserAdresses, removFromAdresses } from './adress.controler.js'

const adressRouter = express.Router({mergeParams:true})

adressRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(addAdressVal),addAdress)
.get(protectedRoutes,allowedTo('user','admin'),getLogedUserAdresses)

adressRouter
.route('/:id')
// // .get(validation(paramsIdVal),getSingleReview)
// // .put(protectedRoutes,allowedTo('user'),validation(updateReviewVal),updateReview)
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removFromAdresses)


export {
    adressRouter
}