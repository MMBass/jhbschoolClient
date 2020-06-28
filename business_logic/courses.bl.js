const dal = require('../dal');

function getCourses(cb) {
    dal.readAll("SELECT * FROM `courses` WHERE 1", (err, courses) => {
        if (courses.length >= 0) {
            cb(null, courses);
        } else if(err){
            cb(err);
        }
    });
}

function addNewCourse(newData,cb) {
  let role = newData.verifyed.user.role
  if(role < 3){
    dal.write("INSERT INTO `courses`(`name`,`description`, `image`) VALUES ('" + newData.name + "','" + newData.description + "','" + newData.image + "')", (err) => {
        if (err) console.log(err);
        else dal.readOne("SELECT * FROM `courses` WHERE id=(SELECT max(id) FROM `courses`)", (err, answer) => {
            if (err) console.log(err);
            cb(null, answer);
        })
    });
  }
}

function editCourse(newData, course_id,role, cb) {
  if(role < 3){
    dal.update("UPDATE `courses` SET `name`='"+newData.name+"',`description`='"+newData.description+"',`image`='"+newData.image+"' WHERE id=" + course_id, (err) => {
         if (err) cb(err);
         else cb(null,true);
    });
  }
}

function deleteCourse(course_id,role, cb) {
  if(role < 3){
    dal.remove("DELETE FROM `courses` WHERE `id`=" + Number(course_id), (err) => {
        if (err) console.log(err);
        else {
             dal.remove("DELETE FROM `registration` WHERE `course_id`=" + course_id,(err)=>{
                if (err) console.log(err);
                else cb(null,true);
             });
        }  
    });
  };
}

module.exports = { editCourse: editCourse, deleteCourse: deleteCourse, addNewCourse: addNewCourse, getCourses: getCourses }