const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId },
    productId: { type: mongoose.Types.ObjectId },
    productTitle: { type: String },
    productPrice: { type: Number },
    productCategory: { type: String },
    productDescription: { type: String },
    productImage: { type: String },
    productRating: { type: Number },
    orderDate:{
      type: Date,
      default: Date.now,
      get: (date) => {
        // Format the date as dd/mm/yy hh:mm:ss
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      },
    },
  },
  { versionKey: false }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
