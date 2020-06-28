const express = require('express');
const router = express.Router();

const courses_bl = require('../business_logic/courses.bl');

router.post('/',function(req,res){
    courses_bl.addNewCourse(req.body,(err,newCourse)=>{
        if(err){
            console.log(err)
            res.status(500).send("add course err");
        }
        res.send(newCourse);
    });
});

router.delete('/delete/:id',function(req,res){
    const currUser = req.body.verifyed.user;
    courses_bl.deleteCourse(req.params.id,currUser.role,(err,success)=>{
        if(err){
            console.log(err)
            res.status(500).send("delete course err");
        }else if(success){
           res.send(true);
        }
    });
});

router.put('/',function(req,res){
    const currUser = req.body.verifyed.user;
    courses_bl.editCourse(req.body,req.body.id,currUser.role,(err,success)=>{
        if(err){
            console.log(err)
            res.status(500).send("edit course err");
        }
        else res.send({saved:true});
    });
});

module.exports = router;