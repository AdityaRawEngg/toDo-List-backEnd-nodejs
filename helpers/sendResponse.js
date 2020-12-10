const sendResponse = (statusCode, data, req, resp) => {
  resp.status(statusCode).json({
    status: "successful",
    data: data,
  });
};

module.exports = sendResponse;
