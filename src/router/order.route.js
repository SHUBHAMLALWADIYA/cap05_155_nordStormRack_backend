const express=require("express");
const {placeOrder,orderHistory} = require("../controller/order.controller");


const orderRouter=express.Router();

orderRouter.post("/placeOrder",placeOrder)
orderRouter.get("/history",orderHistory)

module.exports=orderRouter;