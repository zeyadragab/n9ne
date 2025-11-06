// const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const {con} = require('../db/db');

// global.con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "n9ne",
// });

// con.connect(function (err) {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("Database is connected successfully");
// });

// CREATE ORDER ITEM
router.post("/order-items", (req, res) => {
  console.log("Post Request Received for Order Item");
  con.query(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)",
    [
      req.body.order_id,
      req.body.product_id,
      req.body.quantity,
      req.body.price,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Order Item Added Successfully with Id " + result.insertId,
      });
      console.log("Order Item Added: " + result.insertId);
    }
  );
});

// GET ORDER ITEMS
router.get("/order-items", (req, res) => {
  var item_id = req.query.id;
  if (item_id == "%") {
    con.query(
      "SELECT oi.*, p.name as product_name, p.image_url FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.id LIKE ?",
      [item_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  } else {
    con.query(
      "SELECT oi.*, p.name as product_name, p.image_url FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.id = ?",
      [item_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  }
  console.log("Incoming Request for Order Items");
});

// GET ORDER ITEMS BY ORDER ID
router.get("/order-items/order", (req, res) => {
  var order_id = req.query.order_id;
  con.query(
    "SELECT oi.*, p.name as product_name, p.image_url, p.size, p.color FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?",
    [order_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    }
  );
});

// DELETE ORDER ITEM
router.delete("/order-items", (req, res) => {
  var item_id = req.query.id;
  con.query(
    "DELETE FROM order_items WHERE id = ?",
    [item_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Order Item Id [" + req.query.id + "] deleted Successfully",
      });
      console.log("Order Item deleted: " + req.query.id);
    }
  );
});

// UPDATE ORDER ITEM
router.put("/order-items", (req, res) => {
  console.log("PUT Request Received for Order Item");
  var item_id = req.query.id;
  con.query(
    "UPDATE order_items SET order_id=?, product_id=?, quantity=?, price=? WHERE id = " +
      item_id,
    [
      req.body.order_id,
      req.body.product_id,
      req.body.quantity,
      req.body.price,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Order Item Id [" + item_id + "] is Updated Successfully",
      });
      console.log("Order Item Updated: " + item_id);
    }
  );
});

module.exports = router;