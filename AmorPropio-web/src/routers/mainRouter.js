const express = require("express");
const mainController = require("../controllers/mainController")
const router = express.Router();

router.get("/", mainController.home);
router.get("/cart", mainController.cart);
router.post('/search', mainController.search)
module.exports = router