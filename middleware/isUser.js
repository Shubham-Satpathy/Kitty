require('dotenv').config()
const User=require('../models/User');
const jwt = require('jsonwebtoken');
const isUser=async (req,res,next)=>{
    const token=req.cookies.token;
    if(token){
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const username=decoded.userId;
            const person=await User.findOne({username});
            if(person){
                next();
                return;
            }
        }catch(err){
            return res.render("./auth/login",{message:""});
        }
    }
    return res.render("./auth/login",{message:""});
}

module.exports=isUser;