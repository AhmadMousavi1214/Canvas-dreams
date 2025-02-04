const express = require("express");
const { authenticateUser, isSuperuser } = require("../middleware/authMiddleware");
const UserController = require("../controllers/UserController");

const router = express.Router();

// User Routes
router.post("/register", UserController.createUser);
router.post("/login", UserController.login);
router.get("/", authenticateUser, UserController.getAllUsers);
router.get("/:id", authenticateUser, UserController.getUserById);
router.put("/:id", authenticateUser, UserController.updateUser);
router.delete("/:id", authenticateUser, UserController.deleteUser);

module.exports = router;
