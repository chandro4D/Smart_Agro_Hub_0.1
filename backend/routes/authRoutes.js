const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 3. GET API to fetch all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find(); // fetch all products
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch products", error: err.message });
    }
});
// SIGNUP
router.post("/signup", async (req,res)=>{
 try{

  const {name,email,password} = req.body;

  const userExist = await User.findOne({email});

  if(userExist){
    return res.status(400).json({message:"User already exists"});
  }

  const hashedPassword = await bcrypt.hash(password,10);

  const newUser = new User({
    name,
    email,
    password:hashedPassword
  });

  await newUser.save();

  res.status(201).json({message:"User created successfully"});

 }catch(error){
   res.status(500).json(error);
 }

});


// LOGIN
router.post("/login", async (req,res)=>{
 try{

  const {email,password} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(404).json({message:"User not found"});
  }

  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
    return res.status(400).json({message:"Invalid password"});
  }

  const token = jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  );

  res.json({
    token,
    user
  });

 }catch(error){
   res.status(500).json(error);
 }

});

module.exports = router;