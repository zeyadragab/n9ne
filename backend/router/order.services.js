const express = require("express");
const router = express.Router();
const { con } = require("../db/db");

// CREATE ORDER
router.post("/orders", (req, res) => {
  console.log("Post Request Received for Order");
  con.query(
    "INSERT INTO orders (`user_id`, `total_amount`, `status`) VALUES (?,?,?)",
    [req.body.user_id, req.body.total_amount, req.body.status],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Order Added Successfully with Id " + result.insertId,
        OrderId: result.insertId,
      });
      console.log("Order Added: " + result.insertId);
    }
  );
});

// GET ORDERS
router.get("/orders", (req, res) => {
  var order_id = req.query.id;
  if (order_id == "%") {
    con.query(
      "SELECT o.*, u.userName, u.email FROM orders o LEFT JOIN users u ON o.user_id = u.id WHERE o.id LIKE ? ORDER BY o.created_at DESC",
      [order_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  } else {
    con.query(
      "SELECT o.*, u.userName, u.email FROM orders o LEFT JOIN users u ON o.user_id = u.id WHERE o.id = ?",
      [order_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  }
  console.log(`Incoming Request for Orders`);
});

// DELETE ORDER
router.delete("/orders", (req, res) => {
  var order_id = req.query.id;
  con.query(
    "DELETE FROM orders WHERE id = ?",
    [order_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Order Id [" + req.query.id + "] deleted Successfully",
      });
      console.log("Order deleted: " + req.query.id);
    }
  );
});

// UPDATE ORDER
router.put("/orders", (req, res) => {
  console.log("PUT Request Received for Order");
  var order_id = req.query.id;
  con.query(
    "UPDATE orders SET `user_id`=?, `total_amount`=?, `status`=? WHERE id = " +
      order_id,
    [req.body.user_id, req.body.total_amount, req.body.status],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Order Id [" + order_id + "] is Updated Successfully",
      });
      console.log("Order Updated: " + order_id);
    }
  );
});

// UPDATE ORDER STATUS
router.put("/orders/status", (req, res) => {
  console.log("PUT Request for Order Status");
  var order_id = req.query.id;
  con.query(
    "UPDATE orders SET `status`=? WHERE id = ?",
    [req.body.status, order_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Order Status Updated Successfully",
      });
      console.log("Order Status Updated: " + order_id);
    }
  );
});

// GET ORDERS BY USER
router.get("/orders/user", (req, res) => {
  var user_id = req.query.user_id;
  con.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [user_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    }
  );
});

// SEARCH ORDERS
router.get("/orders/search", (req, res) => {
  keyword = req.query.keyword;
  keyvalue = req.query.keyvalue;
  con.query(
    `SELECT * FROM orders WHERE ${keyword} LIKE ?`,
    ["%" + keyvalue + "%"],
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    }
  );
});

module.exports = router;
