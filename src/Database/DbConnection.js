const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/TodoProject")

.then(() => {
    console.log("Db Connection Established")
})
.catch((error) => {
    console.log(`DB Connection Error ${error}`)
})