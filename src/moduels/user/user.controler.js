import { userModel } from '../../../databases/models/user.model.js';
import { catchError } from '../../middelware/catchError.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';


// add user
const addUser = catchError(async (req,res)=> {
    let user = new userModel(req.body)
    await user.save()
    res.json({message:'success',user})
    })

//get all usres
const getAllUsers = catchError(async(req,res)=> {
    let apiFeatures = new ApiFeatures(userModel.find(),req.query)
   .sort().fields().filteration().pagination().search()

    let users = await apiFeatures.mongooseQuery;
    res.json({ massage: "successs",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, users });
   })

// get single user
const getSingleUser = catchError(async (req,res)=> {
    let user = await userModel.findById(req.params.id)
    !user && res.status(404).json({message:'category not found'})
    user && res.json({message:'success',user})
    
})

// update user
const updateUser = catchError(async (req,res)=> {
    let user = await userModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
    !user && res.status(404).json({message:'user not found'})
    user && res.json({message:'success',user})
})


//delete user
const deleteUser = catchError(async (req,res)=> {
    let user = await userModel.findByIdAndDelete(req.params.id)
    !user && res.status(404).json({message:'user not found'})
    user && res.json({message:'success',user})
})

export {
    addUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}