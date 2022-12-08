const jwt = require("jsonwebtoken");
const { notifyError } = require("../error/errorHandler");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(notifyError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(notifyError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};
const verifyAuthorization = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id == req.params.id || req.user.role === 0) {
            next();
        } else {
            if (err) return next(notifyError(403, "You are not authorized"));
        }
    });
};
const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === 0) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

module.exports = {
    verifyToken,
    verifyAuthorization,
    verifyAdmin,
};
