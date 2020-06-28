const express = require('express');
const router = express.Router();

const students_bl = require('../business_logic/students.bl');

router.post('/',function(req,res){
    students_bl.addNewStudent(req.body,(err)=>{
        if(err){
            console.log(err)
            res.status(500).send("add student err");
        }else{
            res.send(true);
        }
    });
});

router.put('/',function(req,res){
    students_bl.editStudent(req.body,req.body.id,(err)=>{
        if(err){
            console.log( err)
            res.status(500).send("edit student err");
        }else{
            res.send(true);
        }
    });
});

router.delete('/delete/:id',function(req,res){
    students_bl.deleteStudent(req.params.id,(err,success)=>{
        if(err){
            console.log(err)
            res.status(500).send("delete student err");
        }else if(success){
            res.send(true);
        }
    });
});


module.exports = router;