const router = require('express').Router();
const authController = require('../controllers/auth.controllers');

router.post("/register", authController.signUp);

module.exports = router;