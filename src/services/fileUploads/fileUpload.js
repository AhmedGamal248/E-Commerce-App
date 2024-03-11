// import multer from 'multer'
// import { v4 as uuidv4 } from 'uuid';
// import { appError } from '../../utils/appError.js';

// export const fileUpload = ()=> {

//     const storage = multer.diskStorage({
//         destination:  (req, file, cb)=> {
//           cb(null, '/uploads')
//         },
//         filename:  (req, file, cb)=> {
//           cb(null, uuidv4() + '-' + file.originalname)
//         }
//       })

//       function fileFilter (req, file, cb) {

//         if (file.mimetype.startWith('image')){
//             cb(null, 'uploads/')
//         }
//         else{
//             cb(new appError('images only',401))
//         }

//       }
// }




// export const uploadSingleFile = fieldName => fileUpload().singel(fieldName)
// export const uploadArryOfFiles= fieldName => fileUpload().array(fieldName,10)
// export const uploadFilds = fields => fileUpload().fields(fields)




import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { appError } from '../../utils/appError.js';

export const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + '-' + file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new appError('Only images are allowed', 401));
    }
  };

  const upload = multer({ storage, fileFilter });

  return upload;
};

export const uploadSingleFile = (fieldName) => fileUpload().single(fieldName);
export const uploadArrayOfFiles = (fieldName) => fileUpload().array(fieldName, 10);
export const uploadFields = (fields) => fileUpload().fields(fields);