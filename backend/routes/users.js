const express = require("express");
const router = express.Router();
const { getUserById } = require("../api/controllers/user");
const {
    verifyToken,
    verifyAuthorization,
} = require("../api/middlewares/verifyPermission");

router.get("/profile/:userId", verifyAuthorization, getUserById);

module.exports = router;
