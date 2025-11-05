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

// CREATE CATEGORY
router.post("/categories", (req, res) => {
  console.log("Post Request Received for Category");
  con.query(
    "INSERT INTO categories (`name`, `description`, `image_url`) VALUES (?,?,?)",
    [req.body.name, req.body.description, req.body.image_url],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Category Added Successfully with Id " + result.insertId,
      });
      console.log("Category Added: " + result.insertId);
    }
  );
});

// GET CATEGORIES
router.get("/categories", (req, res) => {
  var category_id = req.query.id;
  if (category_id == "%") {
    con.query(
      "SELECT * FROM categories WHERE id LIKE ?",
      [category_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  } else {
    con.query(
      "SELECT * FROM categories WHERE id = ?",
      [category_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  }
  console.log(`Incoming Request for Categories`);
});

// DELETE CATEGORY
router.delete("/categories", (req, res) => {
  var category_id = req.query.id;
  con.query(
    "DELETE FROM categories WHERE id = ?",
    [category_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Category Id [" + req.query.id + "] deleted Successfully",
      });
      console.log("Category deleted: " + req.query.id);
    }
  );
});

// UPDATE CATEGORY
router.put("/categories", (req, res) => {
  console.log("PUT Request Received for Category");
  var category_id = req.query.id;
  con.query(
    "UPDATE categories SET `name`=?, `description`=?, `image_url`=? WHERE id = " +
      category_id,
    [req.body.name, req.body.description, req.body.image_url],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Category Id [" + category_id + "] is Updated Successfully",
      });
      console.log("Category Updated: " + category_id);
    }
  );
});

// SEARCH CATEGORIES
router.get("/categories/search", (req, res) => {
  keyword = req.query.keyword;
  keyvalue = req.query.keyvalue;
  con.query(
    `SELECT * FROM categories WHERE ${keyword} LIKE ?`,
    ["%" + keyvalue + "%"],
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    }
  );
});

module.exports = router;
