// import mongoose from 'mongoose';
const mongoose  = require('mongoose')
const bcrypt = require("bcrypt");
// import * as bcrypt from 'bcrypt'
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});



userSchema.statics.login= async function(email,password){
    
    if(!email){
        if(!password){
            throw Error("Email or password cannot be empty")
        }
        throw Error("Email cannot be empty")
    }
    if(!password){
        throw Error("Password cannot be empty")
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error("Incorrect Email");
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Incorrect Password")
    }
    console.log("login");
    return user
}
userSchema.statics.register= async function(name,email,password){

    // if(!email || !password){
        if(!name){
            throw Error("Name cannot be empty")
        }
        if(!email){
            if(!password){
                throw Error("Email or password cannot be empty")
            }
            throw Error("Email cannot be empty")
        }
        if(!password){
            throw Error("Password cannot be empty")
        }
    // }


    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong");
    }

    const exists = await this.findOne({email});
    if(exists){
        throw Error("Email Already Exists");
    }
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({name, email, password: hash});
    return user

}
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
