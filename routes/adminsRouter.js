const express = require('express');
const router = express.Router();

const admins_bl = require('../business_logic/administrators.bl');

router.get('/',function(req,res){
    const currUser = req.body.verifyed.user;
    admins_bl.getAdminsList(currUser.role,(err,admins)=>{
       if(err) console.log(err);
       else res.send({admins});
    });
});

router.post('/',function(req,res){
    const currUser = req.body.verifyed.user;
    admins_bl.addNewAdmin(req.body.newAdmin,currUser.role,(err)=>{
        if(err) console.log(err);
        else res.send(true);
    });
});

router.put('/',function(req,res){
    const currUser = req.body.verifyed.user;
    admins_bl.editAdmin(req.body.newAdmin,req.body.newAdmin.id,currUser.role,(err)=>{
        if(err) console.log(err);
        else res.send(true);
    });
});

router.delete('/delete/:id',function(req,res){
    const currUser = req.body.verifyed.user;
    admins_bl.deleteAdmin(req.params.id,currUser.id,currUser.role,(err)=>{
        if(err) console.log(err);
        else res.send(true);
    });
});

module.exports = router;