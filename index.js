const express = require("express");
const app = express();

require("./Database/DbConnection");

app.use(express.json());

//routes
const todoRoutes = require("./Routes/TodoRoute");

//user routes 
const userRouter = require("./Routes/userRoute")

app.use("/todolist/auth", userRouter)


app.use("/todolist", todoRoutes);

//server initilization 

app.listen(4000, () => {
  console.log("server start at: http//localhost:4000");
});
