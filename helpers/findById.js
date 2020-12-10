const findById = (tasks, params) => {
  return tasks.findIndex((task) => {
    return task.taskid === params.taskId;
  });
};
module.exports = findById;
