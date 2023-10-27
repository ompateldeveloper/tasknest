const express = require("express");
const {createTask,readTask,readAllTask,updateTask,deleteTask} = require("../controllers/taskController");
const taskRouter = express.Router();

taskRouter.get('/all',readAllTask)
taskRouter.get('/read/:taskId',readTask)
taskRouter.post('/add',createTask)
taskRouter.put('/update/:taskId',updateTask)
taskRouter.delete('/delete/:taskId',deleteTask)

module.exports = taskRouter