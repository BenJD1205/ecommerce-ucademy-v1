const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { errorHandler } = require("../error/errorHandler");

const signUp = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ err: errorHandler });
        }
        return res.json({ success: true, data: user });
    });
};

const signIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "User with that email does not exist. Please signup",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password don't match",
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("access_token", token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

const signOut = async (req, res) => {
    res.clearCookie("access_token").json({ message: "Signout success" });
};

module.exports = {
    signUp,
    signIn,
    signOut,
};
