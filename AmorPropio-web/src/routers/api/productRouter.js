const express = require("express");
const router = express.Router();

const productAPIController = require("../../controllers/api/productController")


router.get('/api/products', productAPIController.list);
router.get('/api/products/:id', productAPIController.detail)

module.exports = router