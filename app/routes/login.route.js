const express = require("express");
const { route } = require("../../app");
const login = require("../controller/login.controller");
const router = express.Router();

router.route("/").get(login.test2);
router.route("/test").get(login.test);

module.exports = router;
