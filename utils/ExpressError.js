class ExpressError extends Error {
    constructor(message, statusCode) {
        super(); // (I think) this will help construct from the parent Error class
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;