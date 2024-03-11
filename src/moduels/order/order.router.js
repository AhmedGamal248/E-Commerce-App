import express from 'express'
import { validation } from '../../middelware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controler.js'
import { addToCart, applyCoupon, getLogedUserCart, removItemFromCart, removeLogedUserCart, updateQuantity } from './cart.controler.js'
import { addToCartVal, paramsIdVal, updateQuantityVal } from './cart.validation.js'

const cartRouter = express.Router({mergeParams:true})

cartRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),validation(addToCartVal),addToCart)
.get(protectedRoutes,allowedTo('user','admin'),getLogedUserCart)
.delete(protectedRoutes,allowedTo('user','admin'),removeLogedUserCart)

cartRouter.post('/applyCoupon',protectedRoutes,allowedTo('user','admin'),applyCoupon)

cartRouter
.route('/:id')
// // .get(validation(paramsIdVal),getSingleReview)
.put(protectedRoutes,allowedTo('user'),validation(updateQuantityVal),updateQuantity)
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removItemFromCart)


export {
    cartRouter
}