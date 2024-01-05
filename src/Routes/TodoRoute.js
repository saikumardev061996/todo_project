const express = require("express");

const router = express.Router();

const  {createTodoData,getTodoData,deleteTodo,updateTodoData}  = require("../controllers/TodoControllers")
const {authenticateToken} = require("../controllers/userController")



//createTodo list

router.post("/task",authenticateToken, createTodoData)

//getTodo list 
router.get("/task/get", authenticateToken,getTodoData)

//Delete Todo 
router.delete("/task/del/:id", deleteTodo)

//Update Todo 
router.put("/task/upd/:id",updateTodoData)


module.exports = router 