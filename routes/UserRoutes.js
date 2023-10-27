const express = require("express");
const {loginUser,registerUser,verifyUser} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/login",(req,res)=>{res.send('get request to Login')});//purge
userRouter.get("/register",(req,res)=>{res.send('get request to Register')});//purge
userRouter.get("/verify",(req,res)=>{res.send('get request to verify')});//purge
userRouter.post("/login",loginUser);
userRouter.post("/register",registerUser);
userRouter.post("/verify",verifyUser);



module.exports = userRouter;