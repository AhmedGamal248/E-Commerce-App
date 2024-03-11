import { copunModel } from "../../../databases/models/copun.model.js"

const addCopun = async (req,res)=> {
await CopunModel.insertMany(req.body)
res.json({message:'success'})
}

const updateCopun = async (req,res)=> {
    await copunModel.findByIdAndUpdate({id:_id},req.body)
    res.json({message:'success'})
    }

const getAllCopuns = async (req,res)=> {
    let copuns = await CopunModel.find()
    res.json({message:'success',copuns})
    }
const deleteCopun = async (req,res)=> {
    await CopunModel.findByIdAndDelete({id:_id})
    res.json({message:'success'})
    }

export {
    addCopun,
    updateCopun,
    getAllCopuns,
    deleteCopun
}