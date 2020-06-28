const dal = require('../dal');

function getRegistrations(cb) {
    dal.readAll("SELECT * FROM `registration` WHERE 1", (err, regist) => {
        if (regist.length >= 0) {
            cb(null, regist);
        } else if (err) {
            cb(err);
        } else {
            cb(null, 'no registration yet');
        }
    });
}

function buildVal(newData,student_id,str){
    newData.map(r=>{
        if(newData.indexOf(r) != newData.length-1){
            str+= `(${student_id},${r}),`;
        }else if(newData.indexOf(r) == newData.length-1){
            str+=`(${student_id},${r})`;
        }    
    });
    return str;
}

function addNewRegis(newData,student_id,cb) {
    let values = buildVal(newData,student_id,'');
    dal.write("INSERT INTO `registration`(`student_id`,`course_id`) VALUES "+ values, (err) => {
        if (err) console.log(err);
        cb(null);
    });
}

function deleteRegis(student_id,cb) {
    dal.remove("DELETE FROM `registration` WHERE `student_id`=" + student_id, (err) => {
        if (err) console.log(err);
        else cb(null,'deleted');
    });
}

module.exports = { getRegistrations: getRegistrations, addNewRegis: addNewRegis,deleteRegis:deleteRegis}