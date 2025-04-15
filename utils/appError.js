class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
// This is a custom error class that extends the built-in Error class.
// It is used to create application-specific errors with a message and status code.
// The constructor takes a message and a status code as arguments.
// It sets the status code, status (based on the status code), and marks the error as operational.
// The captureStackTrace method is used to capture the stack trace of the error.
// This class can be used in the application to handle errors in a consistent way.
