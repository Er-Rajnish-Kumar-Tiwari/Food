const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dbConection = require("./Config/db.js");
const foodRouter = require("./Routes/foodRoutes.js");
const userRouter = require("./Routes/userRoutes.js");
const cartRouter = require("./Routes/cartRoutes.js");
const orderRouter = require("./Routes/orderRoutes.js");
const menuRouter = require("./Routes/menuRoutes.js");
const paymentRoute = require("./Routes/paymentRoutes.js");
const validateRoute = require("./Routes/validateRoutes.js");
require("dotenv").config();


const app=express();
app.use(express.json());
app.use(cors());
dbConection();
app.use(foodRouter);
app.use("/images",express.static("Uploads"));
app.use(userRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(menuRouter);
app.use("/menuImage",express.static("MenuUploads"));
app.use(paymentRoute);
app.use(express.urlencoded({extended:false}));
app.use(validateRoute);

 
app.listen(process.env.port);