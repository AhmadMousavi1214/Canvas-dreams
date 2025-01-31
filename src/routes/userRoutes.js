const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticateUser = require("../middleware/authMiddleware");

// Define user routes
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/", authenticateUser, UserController.getAllUsers);
router.get("/:id", authenticateUser, UserController.getUserById);
router.put("/:id", authenticateUser, UserController.updateUser);
router.delete("/:id", authenticateUser, UserController.deleteUser);

module.exports = router;