const express = require("express");
const router = express.Router();
const { con } = require("../db/db");

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

  // If no ID provided, return all users
  if (!user_id) {
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  } else if (user_id == "%") {
    con.query(
      "SELECT * FROM users WHERE id LIKE ?",
      [user_id],
      function (err, result, fields) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(result);
      }
    );
  } else {
    con.query(
      "SELECT * FROM users WHERE id = ?",
      [user_id],
      function (err, result, fields) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(result);
      }
    );
  }
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

// router.put("/users", (req, res) => {
//   console.log("PUT Request Received");
//   var user_id = req.query.id;
//   con.query(
//     "UPDATE users SET `userName`= ? ,`email` = ?,`phone` = ?,`address` = ? WHERE id = " +
//       user_id,
//     [req.body.userName, req.body.email, req.body.phone, req.body.address],
//     function (err, result, fields) {
//       if (err) throw err;
//       res.json({
//         Status: "OK",
//         Message: "Record Id [" + user_id + "] is Updated Successfully",
//       });
//       console.log("Record Id [" + user_id + "] is Updated Successfully");
//     }
//   );
// });

router.put("/users", (req, res) => {
  console.log("PUT Request Received");
  console.log("Query params:", req.query);
  console.log("Body:", req.body);

  var user_id = req.query.id;

  // Check if user_id exists
  if (!user_id || user_id === "undefined") {
    return res.status(400).json({
      Status: "Error",
      Message: "User ID is required and cannot be undefined",
    });
  }

  // Get current user data first to preserve existing values
  con.query(
    "SELECT * FROM users WHERE id = ?",
    [user_id],
    function (err, result, fields) {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({
          Status: "Error",
          Message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          Status: "Error",
          Message: "User not found",
        });
      }

      const currentUser = result[0];

      // Update with new values or keep old ones
      const updatedData = {
        userName: req.body.userName || currentUser.userName,
        email: req.body.email || currentUser.email,
        phone: req.body.phone || currentUser.phone,
        address: req.body.address || currentUser.address,
        password: currentUser.password, // Keep existing password
      };

      con.query(
        "UPDATE users SET `userName`=?, `password`=?, `email`=?, `phone`=?, `address`=? WHERE id = ?",
        [
          updatedData.userName,
          updatedData.password,
          updatedData.email,
          updatedData.phone,
          updatedData.address,
          user_id,
        ],
        function (err, result, fields) {
          if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({
              Status: "Error",
              Message: err.message,
            });
          }

          res.json({
            Status: "OK",
            Message: "Profile updated successfully",
            user: {
              id: parseInt(user_id),
              userName: updatedData.userName,
              email: updatedData.email,
              phone: updatedData.phone,
              address: updatedData.address,
            },
          });
          console.log("Record Id [" + user_id + "] is Updated Successfully");
        }
      );
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

// LOGIN
router.get("/login", (req, res) => {
  console.log("Login attempt:", req.query.email);

  con.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [req.query.email, req.query.password],
    function (err, result, fields) {
      if (err) {
        console.error("Login error:", err);
        res.json({ Status: "Error", Message: err.message });
      } else {
        if (result.length == 0) {
          res.json({
            Status: "Error",
            Message: "Authentication Failed, Check email or password ...!!!",
          });
        } else {
          // Return complete user data with ID
          const userData = {
            id: result[0].id,
            userName: result[0].userName,
            email: result[0].email,
            phone: result[0].phone,
            address: result[0].address,
            created_at: result[0].created_at,
          };

          console.log("Login successful, user data:", userData);

          res.json({
            Status: "OK",
            Message: "Logged In Successfully",
            user: userData,
          });
        }
      }
    }
  );
});

module.exports = router;
