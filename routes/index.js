const express = require("express");
const router = express.Router();

router.use("/user/auth", require("./auth"));
router.use("/user/cards", require("./cards"));
router.use("/user/loginIds", require("./loginIds"));
router.use("/user/docs", require("./documents"));
router.use("/user/activity", require("./activity"));
router.use("/user/recentlyAdded", require("./recentlyAdded"));

//____________________________

module.exports = router;
