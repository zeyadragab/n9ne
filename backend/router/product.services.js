const express = require("express");
const router = express.Router();
const { con } = require("../db/db");

// CREATE PRODUCT
router.post("/products", (req, res) => {
  console.log("Post Request Received for Product");
  con.query(
    "INSERT INTO products (`category_id`, `name`, `description`, `price`, `stock_quantity`, `size`, `color`, `image_url`) VALUES (?,?,?,?,?,?,?,?)",
    [
      req.body.category_id,
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.stock_quantity,
      req.body.size,
      req.body.color,
      req.body.image_url,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Product Added Successfully with Id " + result.insertId,
      });
      console.log("Product Added: " + result.insertId);
    }
  );
});

// GET PRODUCTS
router.get("/products", (req, res) => {
  var product_id = req.query.id;
  if (product_id == "%") {
    con.query(
      "SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id LIKE ?",
      [product_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  } else {
    con.query(
      "SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?",
      [product_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  }
  console.log(`Incoming Request for Products`);
});

// DELETE PRODUCT
router.delete("/products", (req, res) => {
  var product_id = req.query.id;
  con.query(
    "DELETE FROM products WHERE id = ?",
    [product_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Product Id [" + req.query.id + "] deleted Successfully",
      });
      console.log("Product deleted: " + req.query.id);
    }
  );
});

// UPDATE PRODUCT
router.put("/products", (req, res) => {
  console.log("PUT Request Received for Product");
  var product_id = req.query.id;
  con.query(
    "UPDATE products SET `category_id`=?, `name`=?, `description`=?, `price`=?, `stock_quantity`=?, `size`=?, `color`=?, `image_url`=? WHERE id = " +
      product_id,
    [
      req.body.category_id,
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.stock_quantity,
      req.body.size,
      req.body.color,
      req.body.image_url,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Product Id [" + product_id + "] is Updated Successfully",
      });
      console.log("Product Updated: " + product_id);
    }
  );
});

// SEARCH PRODUCTS
router.get("/products/search", (req, res) => {
  keyword = req.query.keyword;
  keyvalue = req.query.keyvalue;
  con.query(
    `SELECT * FROM products WHERE ${keyword} LIKE ?`,
    ["%" + keyvalue + "%"],
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    }
  );
});

// GET PRODUCTS BY CATEGORY
router.get("/products/category", (req, res) => {
  var category_id = req.query.category_id;
  con.query(
    "SELECT * FROM products WHERE category_id = ?",
    [category_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    }
  );
});

module.exports = router;
