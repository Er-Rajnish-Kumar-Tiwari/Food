const express=require("express");
const {placeOrder, userOrders, adminOrders, updateStatus} = require("../Cotrolls/orderControll");
const authMiddleware = require("../Middlewere/authMiddleware");

const orderRouter=express.Router();

orderRouter.post("/orderPlace",authMiddleware,placeOrder); 
orderRouter.post("/orders",authMiddleware,userOrders); 
orderRouter.get("/ordersList",adminOrders); 
orderRouter.post("/orderstatus",updateStatus);

module.exports=orderRouter;