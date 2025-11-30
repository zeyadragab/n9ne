const express = require("express");
const router = express.Router();
const { con } = require("../db/db");

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

  if (!category_id || category_id == "%") {
    con.query(
      "SELECT id, NAME as name, description, image_url FROM categories",
      function (err, result, fields) {
        if (err) {
          console.error("Error fetching categories:", err);
          return res.status(500).json({ error: err.message });
        }
        console.log("Categories fetched:", result);
        res.json(result);
      }
    );
  } else {
    con.query(
      "SELECT id, NAME as name, description, image_url FROM categories WHERE id = ?",
      [category_id],
      function (err, result, fields) {
        if (err) {
          console.error("Error fetching category:", err);
          return res.status(500).json({ error: err.message });
        }
        console.log("Category fetched:", result);
        res.json(result);
      }
    );
  }
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
