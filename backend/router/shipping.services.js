const express = require("express");
const router = express.Router();
const { con } = require("../db/db");

// CREATE SHIPPING
router.post("/shipping", (req, res) => {
  console.log("Post Request Received for Shipping");
  con.query(
    "INSERT INTO shipping (`order_id`, `shipping_address`, `city`, `postal_code`, `country`, `shipping_method`, `tracking_number`, `shipping_date`, `delivery_date`) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      req.body.order_id,
      req.body.shipping_address,
      req.body.city,
      req.body.postal_code,
      req.body.country,
      req.body.shipping_method,
      req.body.tracking_number,
      req.body.shipping_date,
      req.body.delivery_date,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Shipping Added Successfully with Id " + result.insertId,
      });
      console.log("Shipping Added: " + result.insertId);
    }
  );
});

// GET SHIPPING
router.get("/shipping", (req, res) => {
  var shipping_id = req.query.id;
  if (shipping_id == "%") {
    con.query(
      "SELECT s.*, o.total_amount, o.status as order_status FROM shipping s LEFT JOIN orders o ON s.order_id = o.id WHERE s.id LIKE ?",
      [shipping_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  } else {
    con.query(
      "SELECT s.*, o.total_amount, o.status as order_status FROM shipping s LEFT JOIN orders o ON s.order_id = o.id WHERE s.id = ?",
      [shipping_id],
      function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
      }
    );
  }
  console.log(`Incoming Request for Shipping`);
});

// GET SHIPPING BY ORDER
router.get("/shipping/order", (req, res) => {
  var order_id = req.query.order_id;
  con.query(
    "SELECT * FROM shipping WHERE order_id = ?",
    [order_id],
    function (err, result, fields) {
      if (err) throw err;
      if (result.length === 0) {
        res.json({
          Status: "Error",
          Message: "No shipping found for this order",
        });
      } else {
        res.json(result[0]);
      }
      console.log(result);
    }
  );
});

// DELETE SHIPPING
router.delete("/shipping", (req, res) => {
  var shipping_id = req.query.id;
  con.query(
    "DELETE FROM shipping WHERE id = ?",
    [shipping_id],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Shipping Id [" + req.query.id + "] deleted Successfully",
      });
      console.log("Shipping deleted: " + req.query.id);
    }
  );
});

// UPDATE SHIPPING
router.put("/shipping", (req, res) => {
  console.log("PUT Request Received for Shipping");
  var shipping_id = req.query.id;
  con.query(
    "UPDATE shipping SET `shipping_address`=?, `city`=?, `postal_code`=?, `country`=?, `shipping_method`=?, `tracking_number`=?, `shipping_date`=?, `delivery_date`=? WHERE id = " +
      shipping_id,
    [
      req.body.shipping_address,
      req.body.city,
      req.body.postal_code,
      req.body.country,
      req.body.shipping_method,
      req.body.tracking_number,
      req.body.shipping_date,
      req.body.delivery_date,
    ],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        Status: "OK",
        Message: "Shipping Id [" + shipping_id + "] is Updated Successfully",
      });
      console.log("Shipping Updated: " + shipping_id);
    }
  );
});

// SEARCH SHIPPING BY TRACKING NUMBER
router.get("/shipping/track", (req, res) => {
  var tracking_number = req.query.tracking_number;
  con.query(
    "SELECT s.*, o.id as order_id, o.status as order_status FROM shipping s LEFT JOIN orders o ON s.order_id = o.id WHERE s.tracking_number = ?",
    [tracking_number],
    function (err, result, fields) {
      if (err) throw err;
      if (result.length === 0) {
        res.json({
          Status: "Error",
          Message: "Tracking number not found",
        });
      } else {
        res.json(result[0]);
      }
      console.log(result);
    }
  );
});

module.exports = router;
