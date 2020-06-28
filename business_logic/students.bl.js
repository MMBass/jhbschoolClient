const dal = require('../dal');
const regis_bl = require('./registrations.bl');

function getStudents(cb) {
    dal.readAll("SELECT * FROM `students` WHERE 1", (err, students) => {
        if (students && students.length >= 0) {
            cb(null, students);
        } else if(err){
            console.log(err);
        }
    });
}

function addNewStudent(newData,cb) {
    dal.write("INSERT INTO `students`(`name`,`phone`,`email`, `image`) VALUES ('" + newData.name + "','" + newData.phone + "','"+ newData.email +"','" + newData.image + "')", (err) => {
        if (err) console.log(err);
        else dal.readOne("SELECT `id` FROM `students` WHERE id=(SELECT max(id) FROM `students`)", (err, student_ids) => {
            if (err){
               console.log(err); 
            }else if(newData.registrations){
                regis_bl.addNewRegis(newData.registrations,student_ids[0].id,(err)=>{
                    if (err) console.log(err);
                    cb(null,true);
                });
            }
        })
    });
}

function editStudent(newData, student_id, cb) {
    dal.update("UPDATE `students` SET `name`='"+newData.name+"',`email`='"+newData.email+"',`phone`='"+newData.phone+"',`image`='"+newData.image+"' WHERE id=" + student_id, (err) => {
        if(err){
          console.log(err);  
        } else {
            if(newData.registrations){
                regis_bl.deleteRegis(student_id,(err,deleted)=>{
                    if (err) console.log(err);
                    else {
                        
                        regis_bl.addNewRegis(newData.registrations,student_id,(err)=>{
                            if (err) console.log(err); 
                            else{
                                cb(null,true);
                            } 
                        });
                    }
                 });
            }else{
                cb(null, true);
            }
        }
    });
}

function deleteStudent(student_id, cb) {
    dal.remove("DELETE FROM `students` WHERE `id`=" + student_id, (err) => {
        if (err){
           console.log(err); 
        } else {
            regis_bl.deleteRegis(student_id,(err)=>{
               if (err) console.log(err);
               else cb(null,true);
            });
        };
    });
}

module.exports = { editStudent: editStudent, deleteStudent: deleteStudent, addNewStudent: addNewStudent, getStudents: getStudents }