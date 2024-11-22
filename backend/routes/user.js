const express=require("express")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const User=require("../models/user")
const router=express.Router();

router.post("/register",async(req,res)=>{
    const {username,password}=req.body;
    let user=await User.findOne({username});
    if(user){
        return res.status(400).json({message:"user already exists"});

    }

    const hashedpassword=await bcrypt.hash(password,10);

    user=new User({
        username,
        password:hashedpassword,
    });

    await user.save();

    res.json({message:'user registered'})
})


router.post("/login",async(req,res)=>{
    const {username,password}=req.body
    let user=await User.findOne({username});
    if(!user){
        return res.status(400).json({message:"user not found"})
    }

    const matchpassword=await bcrypt.compare(password,user.password);

    if(!matchpassword){
        return res.status(400).json({message:"wrong password"});
    }

    const token=jwt.sign(
        {_id:user._id},
        process.env.JWT_KEY,
        {expiresIn:'5h'},);

    res.json({
        message:"welcome Admin Panel",
        token,
        user
    })
})

module.exports=router;
