const mongoose = require("mongoose");
const userauthenticationModel = require("./UserAuthontication");

const TodoListSchema = mongoose.Schema({
    taskTitle : {
        type : String,
        required : true
    },
    taskDescription : {
        type : String ,
        required : true
    },
    taskCreatedData : {
        type : Date
    },
    taskCompleted : {
        type : Boolean
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userauthenticationModel, 
        required: true,
      },

},{timestamps : true})

const TodoListModel = mongoose.model("todoData", TodoListSchema)

module.exports = TodoListModel