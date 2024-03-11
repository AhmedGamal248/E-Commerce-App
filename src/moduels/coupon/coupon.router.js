import express from 'express'
import { validation } from '../../middelware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controler.js'
import { addCouponVal, paramsIdVal, updateCouponVal } from './coupon.validation.js'
import { addCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from './coupon.controler.js'

const couponRouter = express.Router({mergeParams:true})

couponRouter.use(protectedRoutes,allowedTo('user'))
couponRouter
.route('/')
.post(validation(addCouponVal),addCoupon)
.get(getAllCoupons)

couponRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleCoupon)
.put(validation(updateCouponVal),updateCoupon)
.delete(validation(paramsIdVal),deleteCoupon)


export {
    couponRouter
}