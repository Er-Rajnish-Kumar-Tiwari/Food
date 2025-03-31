const express=require("express");
const { addToCart, removeFromCart, fetchCart } = require("../Cotrolls/cartControll");
const authMiddleware = require("../Middlewere/authMiddleware");

const cartRouter=express.Router();

cartRouter.post("/addToCart",authMiddleware,addToCart);
cartRouter.post("/removeFromCart",authMiddleware,removeFromCart);
cartRouter.post("/fetchCart",authMiddleware,fetchCart);

module.exports=cartRouter;