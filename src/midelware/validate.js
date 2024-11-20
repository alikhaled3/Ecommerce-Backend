

export const validate =(Schema)=>
{
return (req,res,next)=>{
    const {error} = Schema.validate({...req.body, ...req.params, ...req.query},{abortEarly:false})
 let errors = []
    if(error ){
       error.details.forEach((elm)=>{
        errors.push({message:elm.message,field:elm.path[0]})
       })
        res.json(errors)
   }else{
    next()
   }

 
}
}