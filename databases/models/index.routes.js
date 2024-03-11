import { globalError } from "../../src/middelware/globalError.js"
import { adressRouter } from "../../src/moduels/adress/adress.router.js"
import { authRouter } from "../../src/moduels/auth/auth.router.js"
import { brandRouter } from "../../src/moduels/brand/brand.router.js"
import { cartRouter } from "../../src/moduels/cart/cart.router.js"
import { categoryRouter } from "../../src/moduels/category/category.router.js"
import { couponRouter } from "../../src/moduels/coupon/coupon.router.js"
import { orderRouter } from "../../src/moduels/order/order.router.js"
import { productRouter } from "../../src/moduels/product/product.router.js"
import { reviewRouter } from "../../src/moduels/reviwe/review.router.js"
import { subCategoryRouter } from "../../src/moduels/subCategory/subCategory.router.js"
import { userRouter } from "../../src/moduels/user/user.router.js"
import { wishListRouter } from "../../src/moduels/wishList/wishList.router.js"

export const bootstrap = (app)=> {
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subCategories',subCategoryRouter)
    app.use('/api/v1/brands',brandRouter)
    app.use('/api/v1/products',productRouter)
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/reviews',reviewRouter)
    app.use('/api/v1/wishList',wishListRouter)
    app.use('/api/v1/adresses',adressRouter)
    app.use('/api/v1/coupons',couponRouter)
    app.use('/api/v1/carts',cartRouter)
    app.use('/api/v1/orders',orderRouter)
    app.use(globalError)
}