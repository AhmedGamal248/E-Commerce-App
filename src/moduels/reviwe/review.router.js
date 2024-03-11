import express from 'express'
import { validation } from '../../middelware/validation.js'
import { addReviewVal, paramsIdVal, updateReviewVal } from './review.validation.js'
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview } from './review.controler.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controler.js'

const reviewRouter = express.Router({mergeParams:true})

reviewRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),validation(addReviewVal),addReview)
.get(getAllReviews)

reviewRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleReview)
.put(protectedRoutes,allowedTo('user'),validation(updateReviewVal),updateReview)
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),deleteReview)


export {
    reviewRouter
}