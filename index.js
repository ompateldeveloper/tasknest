require('dotenv').config()

const express = require("express");
const app = express()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const cors = require('cors')
app.use(cors())
app.use(express.json())

const requireAuth = require("./middleware/requireAuth")

app.get('/',(req,res)=>{
    res.send("server working")
})


const User = require("./models/UserModel")
const Admin = require("./models/AdminModel")

const adminMiddleware= async (req,res,next)=>{
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Admin Authorization token required'})
    }
  
    const token = authorization.split(' ')[1]
  
    try {
        const {id} = jwt.verify(token, process.env.ACCESS_TOKEN,{ algorithm: 'HS256' })
        try{
            const admin = await Admin.findOne({adminId:id})
            .then((data)=>{
                if(data){
                    next()
                }
            })
            // res.status(500)


        }
        catch(error){
            console.log(error);
            res.status(401).json({error:"You Are not admin"})
        }

    } catch (error) {
        console.error(error)
        res.status(401).json({error: 'Admin Request is not authorized'})
    }
}

app.get("/users",adminMiddleware,async (req,res)=>{
    const users = await User.find({})
    res.json(users)
})

const userRoutes = require("./routes/UserRoutes")
app.use('/auth',userRoutes)

const taskRoutes = require("./routes/TaskRoutes")
app.use('/tasks',requireAuth,taskRoutes)









const http = require('http')
const httpserver = http.createServer(app);






const {Server} = require('socket.io');

const io = new Server(httpserver,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})



const checkAdmin =async(id)=>{
    const admin = await Admin.findOne({adminId:id})
    if(admin){
        return true
    }
    return false
}

io.on("connection",(socket)=>{

    socket.on('joinRoom', async(token) => {
        const {id} = jwt.verify(token, process.env.ACCESS_TOKEN,{ algorithm: 'HS256' })
        const isAdmin = await checkAdmin(id);
        const users = await User.find({})

        if(isAdmin){
            console.log(id +" has joined as Admin");
            users.map((user)=>{
                socket.join(user._id.toString())
            })
        }
        else{
            socket.join(id);
            console.log(id +" has joined");
        }

    });
    socket.on('addTask',async(task)=>{
        const {user,auther} = task;
        socket.to(user.toString()).emit("taskAdded",task)
    })
    socket.on('deleteTask',async(task)=>{
        const {user,auther} = task;
        socket.to(user.toString()).emit("taskDeleted",task)
    })
    socket.on('updateTask',async(task)=>{
        const {user,auther} = task;
        socket.to(user.toString()).emit("taskUpdated",task)
    })

    io.on("disconnect",()=>{
        console.warn("user disconnected",socket.id);
    })
})













mongoose.connect(process.env.URI).then(()=>{
    httpserver.listen(process.env.PORT || 4000,()=>{
        console.log("served on port 4000 @  http://localhost:4000/");
    })
})
.catch((error)=>{
    console.error(error);
})
