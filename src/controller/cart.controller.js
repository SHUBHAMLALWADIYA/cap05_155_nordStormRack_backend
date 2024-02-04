const { default: mongoose } = require("mongoose");
const CartModel = require("../model/cart.model")
const ProductModel = require("../model/product.model")


const addToCart=async(req,res)=>{

    const {productId}=req.body
    let userdata=req.me;
    console.log("userdatau",userdata)
    try {
        const product=await ProductModel.exists({_id:new mongoose.Types.ObjectId(productId)})
        if(!product){
            return res.status(400).send({msg:"product is not available in collection"})
        }
        const availabeInCart=await CartModel.findOne({productId:new mongoose.Types.ObjectId(productId),userId:new mongoose.Types.ObjectId(userdata.userId)})
           console.log(availabeInCart)
        if(availabeInCart){
            if(availabeInCart.isRemove){
                const updatedData=await CartModel.findByIdAndUpdate({_id:availabeInCart._id},{isRemove:false})
                return res.status(201).send({msg:"product added in cart",product:updatedData})
            }
            else{
                return res.status(400).send({msg:"product is already available in cart"})
            }
        }
        const addProductToCart=new CartModel({userId:new mongoose.Types.ObjectId(userdata.userId),productId:new mongoose.Types.ObjectId(product._id),isRemove:false})
        await addProductToCart.save();
        return res.status(201).send({msg:"product added in cart",product:addProductToCart})
    } catch (error) {
       return res.status(401).send({msg:"addToCart error",error:error.message})
    }
}


//Grade.aggregate([

// {$lookup:{ from: 'people', localField:'gID', 
// foreignField:'_id',as:'myCustomResut'}},
// ]).exec((err, result)=>{
// if (err) {
//   console.log("error" ,err)
// }
// if (result) {
//   console.log(result);
// }
// });
//
const cartData=async(req,res)=>{
    let userdata=req.me;
try {
    const cartdata=await CartModel.aggregate([
        {$match:{userId:new mongoose.Types.ObjectId(userdata.userId),isRemove:false}},{
            $lookup:{
                from: "productdatas",
                localField: "productId",
                foreignField: "_id",
                as: "productdetails"
              }
        },{$unwind:{
            path: "$productdetails"
            
          }}
    ]).exec()


    return res.status(200).send({msg:"your cart products",myproducts:cartdata})
} catch (error) {
    return res.status(401).send({msg:"cartData error",error:error.message})
}
}


const deleteProduct=async(req,res)=>{
    let userdata=req.me;
    const {productId}=req.body
    try {
        const availabeInCart=await CartModel.exists({productId:new mongoose.Types.ObjectId(productId),userId:new mongoose.Types.ObjectId(userdata.userId),isRemove:false})
        if(!availabeInCart){
            return res.status(400).send({msg:"product is not available in collection"})
        }
        const updateDelete=await CartModel.findByIdAndUpdate({_id:availabeInCart._id},{isRemove:true})
        return res.status(200).send({msg:"product is deleted",deletedProduct:productId})
    } catch (error) {
        return res.status(401).send({msg:"cartData error",error:error.message})
    }
}



module.exports={addToCart,cartData,deleteProduct}