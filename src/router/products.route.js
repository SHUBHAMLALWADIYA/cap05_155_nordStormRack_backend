const express=require("express");
const products = require("../controller/products.controller");


const ProductRouter=express.Router();

ProductRouter.get("/",products)


module.exports=ProductRouter;