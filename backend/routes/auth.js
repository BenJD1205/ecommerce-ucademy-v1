const express = require("express");
const router = express.Router();
const { signUp, signIn, signOut } = require("../api/controllers/auth");
const { userSignupValidator } = require("../api/validators");

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);

module.exports = router;
