import multer from 'multer';
import { AppError } from '../utils/AppError.js';


export const uploadSingleFile=(fieldName,folderName)=>{
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, `uploads/${folderName}`)
    },
    filename:   (req, file, cb) =>{
   
      cb(null, Date.now() +'-'+ file.originalname)
    }
  })

  function fileFilter(req,file,cb ){
    console.log(file.mimetype);
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else {
        cb (new AppError('emages only',401),false)
    }
  }
  
  const upload = multer({ storage: storage ,fileFilter})

return upload.single(fieldName)

}



export const uploadMixOfFiles=(arrOfFields,folderName)=>{
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, `uploads/${folderName}`)
    },
    filename:   (req, file, cb) =>{
   
      cb(null, Date.now() +'-'+ file.originalname)
    }
  })

  function fileFilter(req,file,cb ){
    console.log(file.mimetype);
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else {
        cb (new AppError('emages only',401),false)
    }
  }
  
  const upload = multer({ storage: storage ,fileFilter})

return upload.fields(arrOfFields)

}



