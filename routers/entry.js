require('dotenv').config()
const express=require("express");
const router=express.Router();
const { v4:uuid }=require('uuid');
const Entry=require("../models/Entry");
const jwt = require('jsonwebtoken');
const isUser=require("../middleware/isUser")
router.get("/",isUser,async (req,res)=>{
    const token=req.cookies.token;
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const username=decoded.userId;
    const entry=await Entry.find({username}).sort({date:-1});
    // console.log(entry);
    res.render('./entry/index',{entry});
});

router.get("/new",isUser,async (req,res)=>{
    res.render('./entry/new');
});

router.post('/new',isUser,async (req,res)=>{
    const {location,title,details}=req.body;
    const id=uuid();
    const date=new Date();
    // const day=d.getDate();
    // const month=d.getMonth()+1;
    // const year=d.getFullYear();
    // const date=year+'/'+month+'/'+day;
    console.log(date);
    const token=req.cookies.token;
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const username=decoded.userId;
    const nn=[{
        _id:id,
        date:date,
        location:location,
        title:title,
        username:username,
        details:details
    }];
    // console.log(nn);
    await Entry.insertMany(nn);
    res.redirect('/')
});

router.get('/:id',isUser,async (req,res)=>{
    const {id}=req.params;
    const data=await Entry.findOne({_id:id});
    if(data==null){ 
        // console.log("ENded");
        return res.redirect('/');
    }
    // console.log("Outside");
    res.render('./entry/view',{entry:data});
});

router.get('/:id/edit',isUser,async (req,res)=>{
    const {id}=req.params;
    const entry=await Entry.findById(id);
    if(entry==null){ 
        return res.redirect('/');
    }
    res.render('./entry/edit',{entry});
})

router.patch('/:id',isUser,async (req,res)=>{
    const {id}=req.params;
    const {title,details}=req.body;
    await Entry.findByIdAndUpdate(id,{title:title,details:details});
    res.redirect('/entry');
})

router.delete('/:id',isUser,async (req,res)=>{
    const {id}=req.params;
    await Entry.findByIdAndDelete(id);
    res.redirect('/entry');
});

module.exports=router;