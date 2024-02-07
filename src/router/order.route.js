const express=require("express");
const {placeOrder,orderHistory} = require("../controller/order.controller");
const auth = require("../middleware/auth.middleware");


const orderRouter=express.Router();

orderRouter.post("/placeOrder",auth,placeOrder)
orderRouter.get("/history",auth,orderHistory)

module.exports=orderRouter;