const express = require("express");
const router = express.Router();

const userAPIController = require("../../controllers/api/userController")


router.get('/api/users', userAPIController.list);
router.get('/api/users/:id', userAPIController.detail)

module.exports = router