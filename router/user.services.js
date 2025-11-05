const mysql = require("mysql");
const express = require("express");
const router = express.Router();

global.con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "n9ne",
});

con.connect(function (err) {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Database is connected successfully");
});

router.post("/users", (req, res) => {
  console.log("Post Request Received");
  con.query(
    "INSERT INTO users (`userName`, `password`,`email`,`phone`,`address`) VALUES (?,?,?,?,?)",
    [
      req.body.userName,
      req.body.password,
      req.body.email,
      req.body.phone,
      req.body.address,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Record Added Successfully with Id " + result.insertId,
      });
      console.log("Record Added" + result.insertId);
    }
  );
});

router.get("/users", (req, res) => {
  var user_id = req.query.id;
  if (user_id == "%") {
    con.query(
      "SELECT * FROM users where id LIKE ?",
      [user_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  } else {
    con.query(
      "SELECT * FROM users where id = ?",
      [user_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  }
  console.log(`Incoming Request http://localhost:${PORT}`);
});

router.delete("/users", (req, res) => {
  var user_id = req.query.id;
  con.query(
    "DELETE FROM users where id = ?",
    [user_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Record Id [" + req.query.id + "] deleted Successfully",
      });
      console.log(
        "Delete Request Received for record [" + req.query.id + "] received"
      );
    }
  );
});

router.put("/users", (req, res) => {
  console.log("PUT Request Received");
  var user_id = req.query.id;
  con.query(
    "UPDATE users SET `userName`= ?, `password` = ? ,`email` = ?,`phone` = ?,`address` = ? WHERE id = " +
      user_id,
    [
      req.body.userName,
      req.body.password,
      req.body.email,
      req.body.phone,
      req.body.address,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Record Id [" + user_id + "] is Updated Successfully",
      });
      console.log("Record Id [" + user_id + "] is Updated Successfully");
    }
  );
});

router.get("/search", (req, res) => {
  keyword = req.query.keyword;
  keyvalue = req.query.keyvalue;
  con.query(
    `SELECT * FROM users WHERE ${keyword} LIKE ?`,
    ["%" + keyvalue + "%"],
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    }
  );
});

router.get("/login", (req, res) => {
  con.query(
    "SELECT * FROM users where email = ? and password= ?",
    [req.query.email, req.query.password],
    function (err, result, fields) {
      if (err) {
        res.json({ Status: "Error", Message: err });
      } else {
        if (result.length == 0) {
          res.json({
            Status: "Error",
            Message: "Authentication Failed, Check email or password ...!!!",
          });
          console.log(result);
        } else {
          res.json({ Status: "OK", Message: "Loged In Successfully" });
          console.log(result);
        }
      }
    }
  );
  console.log(`Incoming SEARCH Request`);
});

module.exports = router;
