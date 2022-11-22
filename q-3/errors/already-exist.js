const CustomAPIError = require("./custom-error");
const { StatusCodes } = require('http-status-codes');
class AlreadyExsit extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.CONFLICT;
    }
}
module.exports = AlreadyExsit;