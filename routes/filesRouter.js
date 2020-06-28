const express = require('express');
const router = express.Router();
var multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({destination:function(req,file,cb){
  cb(null,'./uploads/')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
});

const upload = multer({storage:storage});

router.post('/',upload.single('Image'),(req,res)=>{
  res.send({saved:true});
});

router.delete('/:name',(req,res)=>{
  fs.unlink("../uploads/"+req.params.name, (err) => {
    if (err) {
        console.log(err);
        res.send(true);
    }else{
      res.send(true);
    }
  });
});

module.exports = router;