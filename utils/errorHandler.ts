const errorHandler = (error, statusCode = 500) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(error.message ? error.message : error),
  };
};

export default errorHandler;
