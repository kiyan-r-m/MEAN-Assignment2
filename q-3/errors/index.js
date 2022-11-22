const CustomAPIError = require('./custom-error');
const BadRequest = require('./bad-request');
const UnAuthenticated = require('./unauthenticated-error');
const AlreadyExsit = require('./already-exist');
module.exports = { CustomAPIError, BadRequest, UnAuthenticated, AlreadyExsit }