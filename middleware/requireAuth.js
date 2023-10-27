const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const Admin = require("../models/AdminModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const {id} = jwt.verify(token, process.env.ACCESS_TOKEN)
    const admin = await Admin.findOne({adminId:id})
    let {_id} = await User.findOne({ _id:id })
    req.user = {_id,isAdmin:admin?true:false}
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth