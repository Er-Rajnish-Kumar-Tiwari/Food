const express=require("express");
const payment = require("../Cotrolls/paymentControll");

const paymentRoute = express.Router();

paymentRoute.post("/payments", payment);

module.exports = paymentRoute;