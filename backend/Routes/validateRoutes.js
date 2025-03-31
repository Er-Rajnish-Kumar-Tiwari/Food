const express=require("express");
const validate = require("../Cotrolls/validateControll");

const validateRoute=express.Router();

validateRoute.post("/validate",validate);

module.exports=validateRoute;