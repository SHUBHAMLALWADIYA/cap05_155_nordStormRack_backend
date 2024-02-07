const CartModel = require("../model/cart.model");
const OrderModel = require("../model/order.model");
const mongoose=require("mongoose")


const placeOrder = async (req, res) => {
  const user = req.me;
  try {
    const cartdata = await CartModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user.userId),
          isRemove: false,
        },
      },
      {
        $lookup: {
          from: "productdatas",
          localField: "productId",
          foreignField: "_id",
          as: "productdetails",
        },
      },
      {
        $unwind: {
          path: "$productdetails",
        },
      },
    ]).exec();

    //     userId: { type: mongoose.Types.ObjectId },
    // productId: { type: mongoose.Types.ObjectId },
    // productTitle: { type: String },
    // productPrice: { type: String },
    // productCategory: { type: String },
    // productDescription: { type: String },
    // productImage: { type: String },
    // productRating: { type: Number },
    // orderDate:{type:Date ,default:Date.now()}

    if (cartdata.lenth == 0) {
    return  res
        .status(400)
        .send({ msg: "your cart is empty , so add some products" });
    }
    const newData = [];
    for (let i = 0; i < cartdata.length; i++) {
      let obj = {
        userId: cartdata[i]["userId"],
        productId:cartdata[i]["productId"],
        productTitle:cartdata[i]["productdetails"]["title"],
        productPrice:cartdata[i]["productdetails"]["price"],
        productCategory:cartdata[i]["productdetails"]["category"],
        productDescription:cartdata[i]["productdetails"]["description"],
        productImage:cartdata[i]["productdetails"]["image"],
        productRating:cartdata[i]["productdetails"]["rating"]

      };
       newData.push(obj)
      
    }
   console.log("newData :",newData)

   const orderPlace=await OrderModel.create(newData);
   
  const updateCartdetails=await CartModel.updateMany({userId: new mongoose.Types.ObjectId(user.userId),isRemove:false},{isRemove:true})

  res.status(201).send({msg:"order is placed successfully"})

  } catch (error) {
    return res
      .status(401)
      .send({ msg: "placeOrder error", error: error.message });
  }
};


const orderHistory =async(req,res)=>{
  const user = req.me;
  try {

    const data=await OrderModel.find({userId: new mongoose.Types.ObjectId(user.userId)})
    res.status(200).send({msg:"history is now available",orderHistory:data})
    
  } catch (error) {
    res.status(200).send({msg:"error in order history",error:error})
  }

}










module.exports={placeOrder,orderHistory}