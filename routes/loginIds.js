const express = require("express");
const router = express.Router();
const loginsController = require("../controllers/loginIds");
const auth = require("../middleware/auth");
router.get("/getLoginIds", loginsController.getLoginIds);
router.get("/getFavorites", loginsController.getFavorites);
router.post("/addLoginId", auth, loginsController.addLoginId);
router.delete("/deleteLoginId/:id", auth, loginsController.deleteLoginId);
router.patch("/editLoginId/:id", auth, loginsController.editLoginId);
router.patch("/toggleFavourite/:id", auth, loginsController.toggleFav);
module.exports = router;
