const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
        ProductID: {type:Number},
        title: {type:String},
        price:  {type:Number},
        category:  {type:String},
        description:  {type:String},
        image:  {type:String},
        rating: {type:Number}
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("productdata", productSchema);

module.exports = ProductModel;