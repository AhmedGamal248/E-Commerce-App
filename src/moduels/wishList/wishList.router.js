import express from 'express'
import { validation } from '../../middelware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controler.js'
import { addWishListVal, paramsIdVal } from './wishList.validation.js'
import { addToWishList, getLogedUserWishList, removFromWishList } from './wishList.controler.js'

const wishListRouter = express.Router({mergeParams:true})

wishListRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(addWishListVal),addToWishList)
.get(protectedRoutes,allowedTo('user','admin'),getLogedUserWishList)

wishListRouter
.route('/:id')
// .get(validation(paramsIdVal),getSingleReview)
// .put(protectedRoutes,allowedTo('user'),validation(updateReviewVal),updateReview)
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removFromWishList)


export {
    wishListRouter
}