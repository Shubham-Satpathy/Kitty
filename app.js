const express=require("express");
const app=express();
const path=require('path');
require('dotenv').config()
const methodOveride=require('method-override');
const cookieParser=require('cookie-parser');
app.use(cookieParser())
app.use(methodOveride('_method'));
app.set('view engine','ejs');
app.use(express.urlencoded({extend:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connection OKK");
})
.catch((err)=>{
    console.log("Error!!!");
});
const entryRoute=require("./routers/entry");
const userRoute=require("./routers/auth");
const isUser=require("./middleware/isUser")
app.get('/',isUser,async (req,res)=>{
    res.redirect("/entry");
});

app.get('/signup',async (req,res)=>{
    res.render("./auth/signup",{message:""});
});

app.use("/user",userRoute);
app.use("/entry",entryRoute);

app.use(async(req,res)=>{
    res.send("Hello");
})

PORT=process.env.PORT || 3000;
app.listen(3000,()=>{
    console.log("Listening in 3000");
})