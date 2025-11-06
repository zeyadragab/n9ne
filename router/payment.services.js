const express = require("express");
const router = express.Router();
const {con} = require('../db/db');

// CREATE PAYMENT
router.post("/payment", (req, res) => {
  console.log("Post Request Received for Payment");
  con.query(
    "INSERT INTO payment (`order_id`, `payment_method`, `payment_status`, `transaction_id`, `amount`) VALUES (?,?,?,?,?)",
    [
      req.body.order_id,
      req.body.payment_method,
      req.body.payment_status || "pending",
      req.body.transaction_id,
      req.body.amount,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Payment Added Successfully with Id " + result.insertId,
      });
      console.log("Payment Added: " + result.insertId);
    }
  );
});

// GET PAYMENT
router.get("/payment", (req, res) => {
  var payment_id = req.query.id;
  if (payment_id == "%") {
    con.query(
      "SELECT p.*, o.total_amount as order_amount, o.status as order_status FROM payment p LEFT JOIN orders o ON p.order_id = o.id WHERE p.id LIKE ? ORDER BY p.payment_date DESC",
      [payment_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  } else {
    con.query(
      "SELECT p.*, o.total_amount as order_amount, o.status as order_status FROM payment p LEFT JOIN orders o ON p.order_id = o.id WHERE p.id = ?",
      [payment_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  }
  console.log(`Incoming Request for Payment`);
});

// GET PAYMENT BY ORDER
router.get("/payment/order", (req, res) => {
  var order_id = req.query.order_id;
  con.query(
    "SELECT * FROM payment WHERE order_id = ?",
    [order_id],
    function (err, result, fields) {
      if (err) throw err;
      if (result.length === 0) {
        res.json({
          Status: "Error",
          Message: "No payment found for this order",
        });
      } else {
        res.json(result[0]);
      }
      console.log(result);
    }
  );
});

// DELETE PAYMENT
router.delete("/payment", (req, res) => {
  var payment_id = req.query.id;
  con.query(
    "DELETE FROM payment WHERE id = ?",
    [payment_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Payment Id [" + req.query.id + "] deleted Successfully",
      });
      console.log("Payment deleted: " + req.query.id);
    }
  );
});

// UPDATE PAYMENT
router.put("/payment", (req, res) => {
  console.log("PUT Request Received for Payment");
  var payment_id = req.query.id;
  con.query(
    "UPDATE payment SET `payment_method`=?, `payment_status`=?, `transaction_id`=?, `amount`=? WHERE id = " +
      payment_id,
    [
      req.body.payment_method,
      req.body.payment_status,
      req.body.transaction_id,
      req.body.amount,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Payment Id [" + payment_id + "] is Updated Successfully",
      });
      console.log("Payment Updated: " + payment_id);
    }
  );
});

// UPDATE PAYMENT STATUS
router.put("/payment/status", (req, res) => {
  console.log("PUT Request for Payment Status");
  var payment_id = req.query.id;
  con.query(
    "UPDATE payment SET `payment_status`=? WHERE id = ?",
    [req.body.payment_status, payment_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Payment Status Updated Successfully",
      });
      console.log("Payment Status Updated: " + payment_id);
    }
  );
});

// GET PAYMENT BY TRANSACTION ID
router.get("/payment/transaction", (req, res) => {
  var transaction_id = req.query.transaction_id;
  con.query(
    "SELECT * FROM payment WHERE transaction_id = ?",
    [transaction_id],
    function (err, result, fields) {
      if (err) throw err;
      if (result.length === 0) {
        res.json({
          Status: "Error",
          Message: "Transaction not found",
        });
      } else {
        res.json(result[0]);
      }
      console.log(result);
    }
  );
});

module.exports = router;
