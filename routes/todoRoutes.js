const express = require("express");
const {
  getAllTask,
  createTask,
  verifyPostRequest,
  updateById,
  verifyUpdateRequest,
  findById,
} = require("../controllers/taskController");
const router = express.Router();

router.route("/tasks").get(getAllTask).post(verifyPostRequest, createTask);

router.route("/tasks/:taskId").put(verifyUpdateRequest, updateById);

// .get(getSingleTask)
// .delete(deleteById);

module.exports = router;
