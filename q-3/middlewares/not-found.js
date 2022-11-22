const path = require('path');
const { StatusCodes } = require('http-status-codes')
const FileNotFound = (req, res) => {
    // res.status(StatusCodes.NOT_FOUND).sendFile(path.join(__dirname, '../public/not-found.html'));
    res.status(StatusCodes.NOT_FOUND).json({ msg: `Error 404` });
}
module.exports = FileNotFound;