const express = require('express');
const router = express.Router();

const students_bl = require('../business_logic/students.bl');
const courses_bl = require('../business_logic/courses.bl');
const regis_bl = require('../business_logic/registrations.bl');

router.get('/', function (req, res) {
   students_bl.getStudents((err, students) => {
       if (err) res.status(500).send();
       else {
         courses_bl.getCourses((err, courses) => {
             if (err) res.status(500).send();
             else {
                regis_bl.getRegistrations((err,regis)=>{
                   if (err) res.status(500).send();
                   else{
                         res.send({students,courses,regis});
                   }
                });
             };
         });
       };
    });
 });

module.exports = router;