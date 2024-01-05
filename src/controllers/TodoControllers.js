const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//todolist model
const TodoListModel = require("../Model/TodoModel");

//todouser Registaion model

const userauthenticationModel = require("../Model/UserAuthontication");

//Create Todo Data
const createTodoData = async (req, res) => {
  const user = req.user;
  const { taskTitle, taskDescription } = req.body;
  const Dbuser = await userauthenticationModel.findOne({
    username: user.username,
  });

  try {
    const requestedData = {
      taskTitle: taskTitle,
      taskDescription: taskDescription,
      taskCreatedData: new Date(),
      taskCompleted: false,
      user_id: Dbuser._id,
    };
    const createTodoTaskData = await new TodoListModel(requestedData);
    const postData = await createTodoTaskData.save();
    res.send(postData);
  } catch (error) {
    res.send(error.massage);
  }
};

//get Todo data
const getTodoData = async (req, res) => {
  const user = req.user;
  const Dbuser = await userauthenticationModel.findOne({
    username: user.username,
  });
  const getTodoList = await TodoListModel.find({ user_id: Dbuser._id });
  res.send(getTodoList);
};


//update todo data

const updateTodoData = async (req,res) => {
  try{
      const id = req.params.id
      const todoUpdateItem = await TodoListModel.findByIdAndUpdate({_id:id}, req.body, {new : true})
      res.status(201).json({message : "updatetodo successfully", todoUpdateItem})
  }catch(error){
      res.status(400).json({Error : error.massage})
  }

}


//delete todo data

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todoListData = await TodoListModel.findByIdAndDelete({
      _id: id,
    });
    res.status(200).send({message:"Todo Deleted succefully", todoListData});
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createTodoData,
  getTodoData,
  deleteTodo,
  updateTodoData
};
