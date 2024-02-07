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
    orderDate:{ type: Date, default: Date.now }
  },
  { versionKey: false }
);


orderSchema.virtual('formattedOrderDate').get(function () {
  return moment(this.orderDate).format('DD/MM/YY');
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
