const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const userController = require('../controllers/user.controllers');

//Authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//User DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow)
router.patch("/unfollow/:id", userController.unfollow)

module.exports = router;