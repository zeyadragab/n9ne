const mysql = require("mysql");

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

module.exports = { con };
