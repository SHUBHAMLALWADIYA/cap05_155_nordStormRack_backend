const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
const connection = require("./db");
const userRouter = require("./router/user.route");
const cartRouter = require("./router/cart.route");
const auth = require("./middleware/auth.middleware");
const orderRouter = require("./router/order.rote");

const app=express();

dotenv.config();
const PORT=process.env.PORT;

//middlewares
app.use(cors({
    origin:[
        "https://cap05155nordstormrackbackend-production.up.railway.app",
        "http://127.0.0.1:5173"
    ],
    credentials:true,
}
));
app.use(express.json());
app.use(cookieParser())


//cap05155nordstormrackbackend-production.up.railway.app
//routers
app.use("/user",userRouter)
app.use("/cart",auth,cartRouter)
app.use("/order",auth,orderRouter)


app.get("/",auth,(req,res)=>{
    res.send({msg:"welcome to nordStormRack....."})
})




app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`Server is running now you can do...`)
    } catch (error) {
        console.log(`app connection error.....`,error)
    }
})