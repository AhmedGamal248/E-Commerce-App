import express from 'express'
import { validation } from '../../middelware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controler.js'
import { createCashOrder, getAllOrders, getUserOrder } from './order.controler.js'
import { createOrderVal } from './order.validation.js'

const orderRouter = express.Router({mergeParams:true})

orderRouter.get('/spicificOrder',protectedRoutes,allowedTo('user'),getUserOrder)
orderRouter.get('/allorders',protectedRoutes,allowedTo('user'),getAllOrders)

orderRouter
.route('/:id')
.post(protectedRoutes,allowedTo('user'),validation(createOrderVal),createCashOrder)



export {
    orderRouter
}