const uniqid = require("uniqid");
class Task {
  constructor(taskName) {
    this.tasKId = "task-" + uniqid();
    this.taskName = taskName;
    this.status = "Pending";
  }
}

module.exports = Task;
