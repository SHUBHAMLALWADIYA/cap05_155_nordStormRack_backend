

const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv");
const LogoutModel = require("../model/logout.model");


dotenv.config();



const auth=async(req,res,next)=>{
 
   
   
    console.log(process.env.REFRESHTOKEN_SECRETEKEY)
    console.log(process.env.REFRESHTOKEN_SECRETEKEY)
    console.log(process.env.MONGO_ATLASH_URI)
    console.log(process.env.PORT)

    const accesstoken=req.cookies.accesstoken;
    const refreshtoken=req.cookies.refreshtoken;
    console.log(req.cookies)
    try {
        const logoutData= await LogoutModel.exists({accesstoken})
        console.log("logout",logoutData,"1")
        if(logoutData){
            res.status(200).send({msg:"please login"})
        }

        jwt.verify(accesstoken,process.env.ACCESSSTOKEN_SECRETEKEY,async(err,decoded)=>{
            if(decoded){
            req.me=decoded;
            console.log("decoded",decoded)
                next()
            }else{
                if(err.message==="jwt expired"){
                    jwt.verify(refreshtoken,process.env.REFRESHTOKEN_SECRETEKEY,(err,decoded)=>{
                        const cookieOption={
                            httpOnly:true,
                            secure:true,
                            sameSite:"None"
                        
                        }
                        if (decoded) {
                            const accesstoken = jwt.sign({userId:decoded.userId,username:decoded.username}, process.env.ACCESSSTOKEN_SECRETEKEY, {expiresIn: "15m"});
                           
                           
                            res.cookie("accesstoken", accesstoken,cookieOption);
                          
                            next();
                          } else {
                            res.send("login again because both token expried");
                          }

                    })
                }
            }
        })




        // const decoded=jwt.verify(accesstoken,process.env.ACCESSSTOKEN_SECRETEKEY)
        // console.log(decoded)
        // if(decoded){
        //     req.me=decoded;
        //     console.log("decoded",decoded)
        //         next()
        // }
    } catch (error) {
        console.log(error)
        return res.send({ error: error.message, message: "please login again" });
    }
}


module.exports=auth