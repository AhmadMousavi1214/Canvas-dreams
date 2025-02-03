const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateUser, isSuperuser } = require('../middleware/authMiddleware');


// // Define user routes
// router.post("/", UserController.createUser);
// router.post("/login", UserController.login);
// router.get("/", authenticateUser, UserController.getAllUsers);
// router.get("/:id", authenticateUser, UserController.getUserById);
// router.put("/:id", authenticateUser, UserController.updateUser);
// router.delete("/:id", authenticateUser, UserController.deleteUser);


router.get("/", isSuperuser, UserController.getAllUsers); // Only superusers can see all users
router.get("/:id", isSuperuser, UserController.getUserById);
router.post("/", isSuperuser, UserController.createUser);
router.put("/:id", isSuperuser, UserController.updateUser);
router.delete("/:id", isSuperuser, UserController.deleteUser);

module.exports = router;
