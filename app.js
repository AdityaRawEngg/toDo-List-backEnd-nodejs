const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./routes/todoRoutes");

const app = express();
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use("/todoList", taskRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
