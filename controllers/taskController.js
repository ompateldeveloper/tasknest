const Task = require("../models/TaskModel");

const createTask = async (req, res) => {
  try {
    const { title, completed, pinned, priority, user } = req.body;
    const loggedUser = req.user._id;
    const task = await Task.create({title, completed, pinned, priority, user:user?user:loggedUser, auther:loggedUser});
    // console.log("Task Created by"+req.user._id);//purge
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Task not created" });
  }
};

const readTask = async (req, res) => {
  try {
    const taskId = req.params?.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching task" });
  }
};

// Controller to read all tasks for a user
const readAllTask = async (req, res) => {
  try {
    const user = req.user._id;
    if(req.user.isAdmin){
      const tasks = await Task.find({});
      res.json(tasks);
    }
    else {
      const tasks = await Task.find({ user });
      res.json(tasks);
    }
    // console.log("Reading all Task by "+user+"/admin:"+req.user.isAdmin);//purge
  } catch (error) {
    res.status(500).json({ error: "Error while fetching tasks" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updates = req.body;
    // console.log("Updated Task by "+req.user._id);//purge

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
    });

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error while updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    // console.log("Deleted task by "+req.user._id);//purge
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: "Error while deleting task" });
  }
};

module.exports = {createTask,readTask,readAllTask,updateTask,deleteTask};
