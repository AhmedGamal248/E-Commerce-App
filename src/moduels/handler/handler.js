import { catchError } from "../../middelware/catchError.js"

export const getAllDocuments = (model)=> {
    return catchError(async (req,res)=> {
        let documents = await model.find()
        res.json({message:'success',documents})
    })
}

export const deleteOne = (model)=> {
    return catchError(async (req,res)=> {
        let document = await model.findByIdAndDelete(req.params.id)
        !document && res.status(404).json({message:'document not found'})
        document && res.json({message:'success',document})
    })
}