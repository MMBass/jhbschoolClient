const mysql = require('mysql');

function connection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projectfourdb",
  });
}

function readAll(sql, callBack) {
  const con = connection();
  con.query(sql, function (err, result) {
    if (err) {
      callBack(err);
      console.log(err);
    }
    callBack(null, result);
  });
}

function readOne(sql, callBack) {
  const con = connection();
  con.query(sql, function (err, result) {
    if (err) {
      callBack(err);
      console.log(err);
    }
    callBack(null, result);
  });
}

function write(sql, callBack) {
  const con = connection();
  con.query(sql, function (err) {
    if (err) {
      callBack(err);
    }
    else callBack(null);
  });
}

function update(sql, callBack) {
  const con = connection();
  con.query(sql, function (err) {
    if (err) {
      callBack(err);
      console.log(err);
    }
    else callBack(null, true);
  });
}

function remove(sql, callBack) {
  const con = connection();
  con.query(sql, function (err) {
    if (err) {
      callBack(err);
      console.log(err);
    }
    else callBack(null, true);
  });
}

module.exports = { readAll: readAll,readOne:readOne, write: write, update: update, remove: remove }