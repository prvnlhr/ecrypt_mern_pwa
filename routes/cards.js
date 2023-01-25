const express = require("express");
const router = express.Router();
const cardsController = require("../controllers/cards");
const auth = require("../middleware/auth");
router.get("/getCards", cardsController.getCards);
router.post("/addCard", auth, cardsController.addCard);
router.delete("/deleteCard/:id", auth, cardsController.deleteCard);
router.patch("/editCard/:id", auth, cardsController.editCard);
router.patch("/toggleFavourite/:id", auth, cardsController.toggleFav);

module.exports = router;
