const fs = require("fs");
const path = require("path");
const Task = require("../models/task");
const AppError = require("../helpers/appErrorClass");
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const findById = require("../helpers/findById");
const fileName = path.join(__dirname, "..", "data", "task.json");
const tasks = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const verifyPostRequest = (req, resp, next) => {
  const requireProperties = ["taskName"];
  let result = requireProperties.every((key) => {
    return req.body[key];
  });
  console.log(result);
  if (!result) {
    sendError(
      new AppError(400, "Unsuccessful", "Request body not Valid"),
      req,
      resp
    );
  } else {
    next();
  }
};
const verifyUpdateRequest = (req, resp, next) => {
  // let flag = false;
  // let result = ["taskName", "status"].forEach((key) => {
  //   if (req.body[key]) {
  //     flag = true;
  //   }
  // });
  // let keys = Object.keys(req.body);
  // let validProperties = ["taskName", "status"];
  // let result = validProperties.includes(keys);
  // console.log(result);
  let result = ["taskName", "status"].some((key) => {
    return req.body[key];
  });
  if (!result) {
    return sendError(
      new AppError(400, "Unsuccessful", "Request body not Valid"),
      req,
      resp
    );
  }
  next();
};

const getAllTask = (req, resp, next) => {
  sendResponse(200, tasks, req, resp);
};

const createTask = (req, resp, next) => {
  let newTask = new Task(req.body.taskName);
  tasks.push(newTask);
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), (error) => {
    if (error) {
      return sendError(
        new AppError(500, "Internal Error", "Some Error occured in server"),
        req,
        resp
      );
    }
    sendResponse(201, newTask, req, resp);
  });
};

const updateById = (req, resp, next) => {
  let index = findById(tasks, req.params);
  if (index != -1) {
    Object.keys(req.body).forEach((parameter) => {
      if (tasks[index][parameter]) {
        tasks[index][parameter] = req.body[parameter];
      }
    });
    sendResponse(200, tasks[index], req, resp);
  } else {
    return sendError(
      new AppError(400, "unsuccessful", "Task not found"),
      req,
      resp
    );
  }
};

module.exports = {
  getAllTask,
  createTask,
  verifyPostRequest,
  updateById,
  verifyUpdateRequest,
};
