const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
    constructor(
        name = 'AppError',
        message = 'Something went wrong',
        explanation = 'Something went wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.name = name;
        this.explanation = explanation;
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;