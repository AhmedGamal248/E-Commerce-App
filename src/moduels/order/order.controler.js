import { cartModel } from "../../../databases/models/cart.model.js"
import { orderModel } from "../../../databases/models/order.model.js"
import { productModel } from "../../../databases/models/product.model.js"
import { catchError } from "../../middelware/catchError.js"
import { appError } from "../../utils/appError.js"



// add item to cart 
const createCashOrder = catchError(async (req,res,next)=> {

    let cart = await cartModel.findById(req.params.id)
    !cart && next (new appError ('cart not found',404))

    let totalOrederPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount : cart.totalPrice

    let order = new orderModel({
        user: req.user._id,
        orederItems: cart.cartItems,
        totalOrederPrice,
        shippingAdress: req.body.shippingAdress
    })
    await order.save()

    let options = cart.cartItems.map((prod)=> {
        return({
            updateOne: {
                "filter": {_id: prod.product},
                "update": { $inc: {sold: prod.quantity , quantity: - prod.quantity}}
            }
        })
    })

    productModel.bulkWrite(options)

    await cartModel.findByIdAndDelete(req.params.id)

    res.json({message: 'success',order})
})

// get user order  
const getUserOrder = catchError(async (req,res,next)=> {

    let order = await orderModel.findOne({user: req.user._id})
    !order && next(new appError('you do not have any orders'))
    order && res.json({message:'success',order})
    
})


// get all orders 
const getAllOrders = catchError(async (req,res,next)=> {

    let orders = await orderModel.find({})
    !orders && next(new appError('you do not have any orders'))
    orders && res.json({message:'success',orders})
    
})




export {
    createCashOrder,
    getUserOrder,
    getAllOrders
}