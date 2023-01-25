const express = require("express");
const router = express.Router();
const multerUploads = require("../middleware/multerUploads");
const documentsController = require("../controllers/documents");
const auth = require("../middleware/auth");

router.get("/getDocs", documentsController.getDocs);

router.post(
  "/addDoc",
  auth,
  multerUploads.single("file"),
  documentsController.addDoc
);

router.patch("/toggleFavourite/:id", auth, documentsController.toggleFav);

router.delete("/deleteDoc/:id", auth, documentsController.deleteDoc);

router.patch("/editDoc/:id", auth, documentsController.editDoc);
module.exports = router;
