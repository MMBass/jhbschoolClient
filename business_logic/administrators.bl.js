const dal = require('../dal');
const CryptoJS = require("crypto-js");

function findUser(userInput, cb) {
  dal.readAll("SELECT `id`,`name`,`role`,`image` FROM `administrators` WHERE email = '" + userInput.un + "' AND password = '" + CryptoJS.SHA256(userInput.pass).toString() + "'", (err, users) => {
    if(!users) cb ("no user")
    if (users.length === 1) {
      cb(null, users[0]);
    } else if (users.length < 1) {
      cb(null, 'user not exsist');
    } else if (err) {
      console.log(err);
      cb(err);
    }
  });
}

function getAdminsList(role, cb) {
  if (Number(role) < 3) {
    dal.readAll("SELECT * FROM `administrators` WHERE role >= " + role, (err, admins) => {
      if (admins.length >= 0) {
        cb(null, admins);
      } else if (err) {
        console.log(err);
        cb(err);
      }
    });
  }
}

function addNewAdmin(newData, role, cb) {
  if (Number(role) < 3) {
    dal.write("INSERT INTO `administrators`(`name`,`phone`, `email`, `role`, `image`) VALUES ('" + newData.name + "','" + newData.phone + "','" + newData.email + "','" + newData.role + "','" + newData.image + "')", (err) => {
      if (err) console.log(err);
      else dal.readAll("SELECT * FROM `administrators` WHERE id=(SELECT max(id) FROM `administrators`)", (err, answer) => {
        if (err) console.log(err);
        cb(null, answer);
      })
    });
  }
}

function editAdmin(newData, admin_id, role, cb) {
  if (Number(role) < 3) {
    if (newData.pass) {
      dal.update("UPDATE `administrators` SET `name`='" + newData.name + "',`email`='" + newData.email + "',`phone`='" + newData.phone + "',`image`='"+newData.image+"',`password`='"+CryptoJS.SHA256(newData.pass).toString()+"' WHERE id=" + admin_id, (err) => {
        if (err) console.log(err);
        cb(null, true);
      });
    } else {
      dal.update("UPDATE `administrators` SET `name`='" + newData.name + "',`email`='" + newData.email + "',`phone`='" + newData.phone + "',`image`='"+newData.image+"' WHERE id=" + admin_id, (err) => {
        if (err) console.log(err);
        cb(null, true);
      });
    }

  }
}

function deleteAdmin(admin_id, activeAdmin_id, role, cb) {
  if (Number(role) < 3 && admin_id != activeAdmin_id) {
    dal.remove("DELETE FROM `administrators` WHERE `id`=" + admin_id + " AND `role` > 1", (err) => {
      if (err) console.log(err);
      cb(null, true);
    });
  }
}

module.exports = { findUser: findUser, editAdmin: editAdmin, deleteAdmin: deleteAdmin, addNewAdmin: addNewAdmin, getAdminsList: getAdminsList }