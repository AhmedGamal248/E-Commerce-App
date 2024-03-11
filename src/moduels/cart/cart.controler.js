import { cartModel } from "../../../databases/models/cart.model.js"
import { couponModel } from "../../../databases/models/coupon.model.js"
import { productModel } from "../../../databases/models/product.model.js"
import { catchError } from "../../middelware/catchError.js"
import { appError } from "../../utils/appError.js"


// func to calc cart tatal price
const calcTotalPrice = (cart)=> {
    let totalPrice = 0;
    cart.cartItems.forEach(element => {
        totalPrice += element.quantity * element.price;
    });
    cart.totalPrice = totalPrice

    if (cart.discount) {
        let totalPriceAftrDisc = cart.totalPrice - (cart.totalPrice * cart.discount) /100
        cart.totalPriceAfterDiscount = totalPriceAftrDisc
    }
}

// add item to cart 
const addToCart = catchError(async (req,res,next)=> {

    let product = await productModel.findById(req.body.product)
    if (!product) return next (new appError('product not found',404))

    req.body.price = product.price

    if (req.body.quantity > product.quantity ) return next (new appError('sold out'))
    let isCartExist = await cartModel.findOne({user: req.user._id})

    if (!isCartExist) {
        let cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body]
        })

        calcTotalPrice(cart)
        await cart.save()

        !cart && next (new appError ('cart not found',404))
        cart && res.json({message:'success',cart})

    } else {
        let item = isCartExist.cartItems.find((item)=> item.product == req.body.product)

        if (item) {
            if (item.quantity >= product.quantity) return next (new appError('sold out'))
            item.quantity += req.body.quantity || 1
            
        } else {
            isCartExist.cartItems.push(req.body)
        }

        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.json({message:'product added successfuly',isCartExist})
    }
    
})


//remove item from cart
const removItemFromCart = catchError(async (req,res,next)=> {

    let item = await cartModel.findOneAndUpdate({user: req.user._id} ,
        {$pull: {cartItems: {_id: req.params.id} }},{new: true})
        calcTotalPrice(item)
        await item.save()
    !item && next (new appError ('item not found',404))
    item && res.json({message:'success',item})
})


//update Quantity
const updateQuantity = catchError(async (req,res,next)=> {

    let product = await productModel.findById(req.body.product)
    if (!product) return next (new appError('product not found',404))

    let cart = await cartModel.findOne({user: req.user._id})
    !cart && next (new appError ('cart not found',404))

    let item = cart.cartItems.find((ele)=> ele._id == req.params.id)
    !item && next (new appError ('item not found',404))

    if (req.body.quantity > product.quantity ) return next (new appError('sold out'))
    item.quantity = req.body.quantity

    calcTotalPrice(cart)
    await cart.save()
    cart && res.json({message: 'success',cart})
})

//get Loged User cart
const getLogedUserCart = catchError(async (req,res,next)=> {

   const cart = await cartModel.findOne({user: req.user._id}).populate('cartItems.product')
   !cart && next( new appError('cart not found',404))
   cart && res.json({message: 'success',cart})
   
})


//remove Loged User cart
const removeLogedUserCart = catchError(async (req,res,next)=> {

   const cart = await cartModel.findOne({user: req.user._id})
   if (cart) {
    await cartModel.findOneAndDelete({user:req.user._id})
    res.json({message: 'success'})
   } else {
     next( new appError('cart not found',404))
   }
})

//apply coupon
const applyCoupon = async (req,res,next) => {
    let coupon = await couponModel.findOne({code: req.body.coupon , expires: {$gte: Date.now()}})

    if (! coupon) next (new appError('invalid coupon'))

    let cart = await cartModel.findOne({user: req.user._id})
    !cart && next (new appError('cart not found',404))
    
    let totalPriceAftrDisc = cart.totalPrice - (cart.totalPrice * coupon.discount) /100
    cart.totalPriceAfterDiscount = totalPriceAftrDisc
    cart.discount = coupon.discount

    await cart.save()

    res.json({message: 'success' , cart})
     
}

export {
    addToCart,
    removItemFromCart,
    updateQuantity,
    getLogedUserCart,
    removeLogedUserCart,
    applyCoupon
}