const express = require("express");
const router = express.Router();

const recentlyAddedController = require("../controllers/recentlyAdded");

router.get("/getRecentlyAdded", recentlyAddedController.getRecentlyAdded);
router.post("/addRecentlyAdded", recentlyAddedController.addRecentlyAdded);

module.exports = router;
