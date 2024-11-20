
import { catchError } from './../../utils/catchError.js';
import { AppError } from './../../utils/AppError.js';

export const deleteOne = (model,name)=>{
    return catchError( async (req ,res ,next)=>{
        const {id}=req.params
        let  document = await model.findByIdAndRemove(id)
        !document && next( new AppError(`${name} not found`,404))
        let response ={}
        response[name]=document
        
        document && res.status(201).json({message:'success', ...response});
    })
    
}