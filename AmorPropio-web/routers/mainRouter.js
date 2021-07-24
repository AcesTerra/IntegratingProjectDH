const express = require("express");
const mainController = require("../controllers/mainController")
const router = express.Router();

router.get("/", mainController.home);
router.get("/cart", mainController.cart);
router.get("/detail", mainController.detail);
router.get("/login", mainController.login);
router.get("/register", mainController.register);

module.exports = router