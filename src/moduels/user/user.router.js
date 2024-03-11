import  express  from "express";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controler.js";
import { validation } from "../../middelware/validation.js";
import { UpdateUserValidation, addUserValidation, paramsIdVal } from "./user.validation.js";
import { chkEmlEx } from "../../middelware/checkEmailExest.js";

const userRouter = express.Router()


userRouter
.route('/')
.post(validation(addUserValidation),chkEmlEx,addUser)
.get(getAllUsers)

userRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleUser)
.delete(validation(paramsIdVal),deleteUser)
.put(validation(UpdateUserValidation),updateUser)

export {
    userRouter
}