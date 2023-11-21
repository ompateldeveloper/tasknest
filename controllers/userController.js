const Users = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const Admin = require("../models/AdminModel");

function craeteToken(id){
    return jwt.sign({id},process.env.ACCESS_TOKEN,{expiresIn:'3d', algorithm: 'HS256' });
}

const loginUser = async (req,res) => {
    const {email,password} = req.body


    try{
        const user = await Users.login(email,password);
        const username = await user.name;
        console.log("Login:",user.name);//purge
        const token = craeteToken(user.id);
        res.status(200).json({name:username,email,token})
    }catch(err){
        res.status(400).json({err:err.message})
    }
}


const registerUser = async (req,res) => {
    const {name,email,password} = req.body

    const token = craeteToken(Users._id);
    try{
        const user = await Users.register(name,email,password);
        console.log("New User:"+user.name);
        res.status(200).json({name,email,token})
    }catch(err){
        res.status(400).json({err:err.message})
    }
}


const verifyUser = async (req,res)=>{
    const {token} = req.body
    try {
        const {id} = jwt.verify(token, process.env.ACCESS_TOKEN,{ algorithm: 'HS256' })
        const verified = await Users.findOne({ _id:id }) 
        const admin = await Admin.findOne({adminId:id})
        res.status(200).json({value:verified?true:false,isAdmin:admin?true:false})    
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized',value:false})
    }
}
module.exports = {loginUser,registerUser,verifyUser};