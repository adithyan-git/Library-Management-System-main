const multer = require("multer");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
       if(file.fieldname === 'file'){
        cb(null,"./src/Uploads/membership")
       }else if(file.fieldname === 'imageproof'){
        cb(null,"./src/Uploads/proof")
       }else if(file.fieldname === 'bookimage'){
        cb(null,"./src/Uploads/BookImages")
       }else if(file.fieldname === 'image'){
        cb(null,"./src/Uploads/registerImages")
       }else if(file.fieldname === 'idproof'){
        cb(null,"./src/Uploads/proof")
       }else if(file.fieldname === 'profileimage'){
        cb(null,"./src/Uploads/registerImages")
       }
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
});


const uploads = multer({storage:storage});

module.exports = uploads
    
