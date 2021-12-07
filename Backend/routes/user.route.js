const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const userController = require('../controllers/user.controllers');

//Authentification
router.post("/register", authController.signUp);

//User DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);

module.exports = router;