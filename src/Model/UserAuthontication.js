const mongoose = require("mongoose");

const userRegistrationSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gmail : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    

})
const todoUserRegistraionSchema = new mongoose.model("userauthentication", userRegistrationSchema)

module.exports = todoUserRegistraionSchema