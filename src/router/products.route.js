const express=require("express");
const products = require("../controller/products.controller");


const ProductRouter=express.Router();

ProductRouter.post("/",products)


module.exports=ProductRouter;