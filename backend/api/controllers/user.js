const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { notifyError } = require("../error/errorHandler");

const getUserById = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return next(notifyError(400, "User not found"));
        }
        return res.status(200).json({
            success: true,
            data: user,
        });
    });
};

module.exports = {
    getUserById,
};
