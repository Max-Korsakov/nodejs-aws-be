
class LambdaError extends Error {
    public statusCode;
    constructor(message, statusCode = 500) {
      super(message);
      this.name = "LambdaError";
      this.message = message || "Server error";
      this.statusCode = statusCode;
      this.stack = new Error().stack;
    }
  }

export default LambdaError;
  