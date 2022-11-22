const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const customErrorhandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ error: err.message })
    }
    console.log("before internal server error")
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Server Error`);
}
module.exports = customErrorhandler;
