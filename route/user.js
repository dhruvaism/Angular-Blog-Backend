const { getUserInfo,saveImagePath } = require('../controller/user');
const { isValidToken} = require('../config/helper');
const router = require('express').Router();
const multer = require('multer');
const { route } = require('./blog');

const storage = multer.diskStorage({
      destination: (req,file,callback)=> {
         callback(null,'./uploads/');
      },
      filename:(req,file,callback)=> {
         let fileName = Date.now()+Math.round(Math.random()*1000);
         if(file.mimetype === 'image/jpeg') {
           fileName = fileName.toString()+'.jpeg';
         }else  if(file.mimetype === 'image/png') {
            fileName = fileName.toString()+'.png';
         }

         callback(null,fileName);
      }
});


const fileFilter = (req,file,cb) => {
   cb(null,true);
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null,true);
   }else{
      cb(new Error("No acceptable"),false);
   }
}

const upload = multer({
   storage:storage,
   // limits: {
   //    fileSize:1024*1024*1
   // },
   fileFilter: fileFilter
});

router.get("/:id",getUserInfo);
router.post("/upload-profile",upload.single('user_image'),saveImagePath);
router.post("/upload-image",upload.single('image'),(req,res) => {
   res.json({
        success:1,
        path:"http://localhost:3000/"+req.file.path
   });
});


module.exports = router;