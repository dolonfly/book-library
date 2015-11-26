"use strict";

function BookLibraryError(message, errCode, httpStatus) {
    this.errCode = errCode || "UNKNOWN";
    this.httpStatus = httpStatus || 500;
    this.message = message || "Unknown Error.";
}

BookLibraryError.prototype.toError = function(){
    var error = new Error(this.message);
    error.errCode = this.errCode;
    error.httpStatus = this.httpStatus;
    return error;
};

function NotFoundError() {
    return new BookLibraryError("Not Found", "NOT_FOUND", 404);
}

function BadRequestError(message, errCode) {
    return new BookLibraryError(message || "Bad Request", errCode || "BAD_REQUEST", 400);
}

module.exports = {
    NotFoundError: NotFoundError,
    BadRequestError: BadRequestError
};