module.exports = {
    jwt: {
        tokenSecret: process.env.JWT_SECRET,
        tokenLife: "8h", //12h
        refreshTokenSecret: "IT-MNT-&^hddj7&&kAss",
        refreshTokenLife: "7d",
        algorithms: "HS256",
        userProperty: "auth",
    },
    bcrypt: {
        saltRounds: 10,
    },
    hmacSignOptions: {
        algorithm: "HS256",
        expiresIn: 15 * 60,
    },
};
