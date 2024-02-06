const ProductModel = require("../model/product.model")


const products=async(req,res)=>{

    try {
        const data=await ProductModel.find();
        console.log(data)
        res.status(200).send({msg:"Cart data is now available",data:data})
    } catch (error) {
        return res.status(401).send({msg:"products error",error:error.message})
    }
}


module.exports=products