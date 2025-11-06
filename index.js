const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// user router table
const userServices = require("./router/user.services");
const paymentServices = require("./router/payment.services");
const categoryServices = require("./router/category.services");
const productServices = require("./router/product.services");
const orderServices = require("./router/order.services");
const shippingServices = require("./router/shipping.services");
const orderItemsServices = require('./router/orderItems.services');
// API routes
app.use("/api", orderServices);
app.use("/api", userServices);
app.use("/api", paymentServices);
app.use("/api", categoryServices);
app.use("/api", shippingServices);
app.use("/api", productServices);
app.use("/api", orderItemsServices);

// app.get("/",  (req, res)=>{
//     return res.send("hello");
// });



const port = 8080;

app.listen( port, () => {console.log(`app running http://localhost:${port}`)});