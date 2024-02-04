const UserModel=require("../model/user.model");
const LogoutModel=require("../model/logout.model")
const cookieParser=require("cookie-parser")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const { sendMail } = require("../config/nodemailer");
dotenv.config();

const acc_secretKey=process.env.ACCESSSTOKEN_SECRETEKEY
const ref_secretKey=process.env.REFRESHTOKEN_SECRETEKEY


//signup
const signup=async(req,res)=>{
   

    //email
    // yourApp.js
const sendEmail = require('./emailService');

// Example: Sending a welcome email

const welcomeSubject = "Welcome and Shubham Lalwadiya's web-site  just follow me in linkdin";
const welcomeText = 'Thank you for registering . We look forward to having you as a member!';
//


    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}/;
    let {email,username,pass}=req.body
    try {
        const sameEmail=await UserModel.exists({email})
       if(sameEmail){
        return res.send({msg:"this user is already register please use another email"})
       }
        if (!passwordRegex.test(pass)) {
           
           return res.status(400).send({msg:"Make youre password very strong", useThisFormation : "atleast one special Character ,atleast one Capital latters ,more than eight character"})
        } 
        bcrypt.hash(pass,5,async(err,hash)=>{
        
            if(err){
                return res.status(400).send({msg:"somthing went wrong in signup (hashing part)",err:err})
            }else{
                const user=new UserModel({email,username,pass:hash});
                await user.save()//replace with create
                console.log(req.body)

                sendMail(email, welcomeSubject, welcomeText)
  .then(() => {
    console.log('Email sent successfully!');
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });



                return res.status(201).send({msg:"New user has been successfully created account"})
            }
        })  
    } catch (error) {
        return res.status(400).send({msg:"somthing wrong in registeration part",error:error.message})
    }
}



//login
const login=async(req,res)=>{
    const {email,pass}=req.body
    const cookieOption={
        httpOnly:true,
        secure:true,
        sameSite:'None'
    }
   
    try {
       
        const findUser= await UserModel.findOne({email})
        const payload={userId:findUser._id,username:findUser.username}
        if(findUser){
        bcrypt.compare(pass,findUser.pass,(err,result)=>{
            if(result){
                const accesstoken=jwt.sign(payload,acc_secretKey,{expiresIn:"15m"})
                const refreshtoken=jwt.sign(payload,ref_secretKey,{expiresIn:"30m"})
                res.cookie("accesstoken",accesstoken,cookieOption)
                res.cookie("refreshtoken",refreshtoken,cookieOption)
                return res.status(200).send({msg:"Login successfull !",accesstoken:accesstoken,refreshtoken:refreshtoken})
            }else{
                return res.status(200).send({msg:"your password is wrong please correct it"})
            }
        })   
        }else{
        return res.status(200).send({msg:"your credential is wrong or You have to register first"})
        }
       
    } catch (error) {
        return res.status(400).send({msg:"something went wrong",error:error.message})
    }
}


const logout = async (req, res) => {
    try {
        const accesstoken = req.cookies.accesstoken;
        const refreshtoken = req.cookies.refreshtoken;
console.log(req.cookies)
        console.log({ "accessToken": accesstoken, "refreshToken": refreshtoken });

        const loggedOutTokens = await LogoutModel.findOne({ accesstoken, refreshtoken });

        if (loggedOutTokens) {
            return res.status(200).send({ msg: "You are already logged out , you have to login again." });
        } else {
            const blackListData = new LogoutModel({ accesstoken, refreshtoken });
            await blackListData.save();
            return res.status(200).send({ msg: "You are logged out now." });
        }

    } catch (error) {
        return res.status(400).send({ msg: "Something went wrong", error: error.message });
    }
};


// const forgetPass=async (req, res) => {
//     try {
        
//         const { email } = req.body;
  
//     // Find the user by email
//     const user =await UserModel.find({email:email});
  
//     // Check if the user exists
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
  
//     // Generate a new OTP for password reset
//     const newOtp = Math.floor(100000 + Math.random() * 900000);
  
//     // Update user's OTP in the data (you might want to update it in the database)
//     user.otp = newOtp;
  
//     // Send OTP to the user's email
//     sendOtpEmail(email, newOtp);
  
//     res.json({ message: 'OTP sent to your email for password reset.' });
  
  
//     } catch (error) {
//         res.send({msg:"we are in forget password functinality",error:error.message})
//     }
// }


//   // Function to send OTP email
//   function sendOtpEmail(email, otp,pass) {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: "shubhamlalwadiya@gmail.com",
//         pass: "Shubham@230201",
//       },
//     });
    
  
//     const mailOptions = {
//       from: "shubhamlalwadiya@gmail.com",
//       to: email,
//       subject: 'Your OTP for NordStackRack',
//       text: `Your OTP for NordStackRack is: ${otp}`,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
//   }

module.exports={login,signup,logout}