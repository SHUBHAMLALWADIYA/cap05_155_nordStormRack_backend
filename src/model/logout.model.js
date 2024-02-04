const mongoose=require("mongoose");


const logoutSchema=mongoose.Schema({
    accesstoken:String,
    refreshtoken:String
},{versionKey:false})

const LogoutModel=mongoose.model("blackList",logoutSchema);

module.exports=LogoutModel;