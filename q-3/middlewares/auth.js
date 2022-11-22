const jwt = require("jsonwebtoken")
const { UnAuthenticated } = require("../errors");
const auth = (req, res, next) => {
    // const reqHeader = req.headers;
    /* const reqHeader = req.session.sToken;
    console.log("JWT token", reqHeader);
    if (!reqHeader || !reqHeader.authorization.startsWith('Bearer')) {
        throw new UnAuthenticated("Unauthenticated User");
    }
    const token = reqHeader.authorization.split(' ')[1]; */
    if (!req.session.sToken) {
        throw new UnAuthenticated("Unauthenticated user trying to login")
    }
    const token = req.session.sToken;
    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }

    catch (err) {
        console.log(err);
        throw new UnAuthenticated("Unauthenticated user")
    }

}
module.exports = auth