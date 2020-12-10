const sendError = (error, req, resp) => {
  resp.status(error.statusCode).json({
    status: error.status,
    message: error.errorMessage,
  });
};

module.exports = sendError;
