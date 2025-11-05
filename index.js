const express = require("express");
const app = express();
app.use(express.json());

// user router table
const userServices = require("./router/user.services");
const paymentServices = require("./router/payment.services");
const categoryServices = require("./router/category.services");
const productServices = require("./router/product.services");
const orderServices = require("./router/order.services");
const shippingServices = require("./router/shipping.services");
// API routes
app.use("/api", orderServices);
app.use("/api", userServices);
app.use("/api", paymentServices);
app.use("/api", categoryServices);
app.use("/api", shippingServices);
