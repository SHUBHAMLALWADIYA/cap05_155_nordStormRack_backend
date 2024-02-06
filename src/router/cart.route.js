const express=require("express");
const { addToCart,cartData, deleteProduct } = require("../controller/cart.controller");

const cartRouter=express.Router();

cartRouter.post("/addToCart",addToCart)
cartRouter.get("/cartData",cartData)
cartRouter.post("/deleteProduct",deleteProduct)

module.exports=cartRouter;