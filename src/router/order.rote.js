const express=require("express");
const placeOrder = require("../controller/order.controller");


const orderRouter=express.Router();

orderRouter.post("/placeOrder",placeOrder)
orderRouter.get("/history",history)

module.exports=orderRouter;