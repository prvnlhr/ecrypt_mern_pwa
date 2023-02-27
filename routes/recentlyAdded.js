const express = require("express");
const router = express.Router();

const recentlyAddedController = require("../controllers/recentlyAdded");
const auth = require("../middleware/auth");

router.get("/getRecentlyAdded", recentlyAddedController.getRecentlyAdded);
router.post("/addRecentlyAdded", recentlyAddedController.addRecentlyAdded);
router.delete("/deleteRecentlyAdded/:id", auth, recentlyAddedController.deleteRecentlyAdded)
module.exports = router;
