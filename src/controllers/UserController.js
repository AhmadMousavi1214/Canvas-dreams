const sequelize = require('../../config/database');
const { User } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserController = {

    // Login 
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Check if user exists
            // correct here when the user enterd the email and pass it dont have to say the user exist or not !
            
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // Validate password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

            res.json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ error: "Server error during login" });
        }
    },

    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll({ attributes: { exclude: ['password'] } }); // Exclude password field
            if (!users.length) {
                return res.status(404).json({ error: 'No users found' });
            }
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching users' });
        }
    },

    // Get a single user by ID
    async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching user' });
        }
    },

    // Create a new user (registration)
    // we do hashing in the model before creating its better !
    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;

            // Validation
            if (!username || !email || !password) {
                return res.status(400).json({ error: 'All fields (username, email, password) are required' });
            }

            // Check if the email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Create new user
            const user = await User.create({ username, email, password });
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating user' });
        }
    },

    // Update user info
    async updateUser(req, res) {
        try {
            const { username, email } = req.body;
            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.update({ username, email });
            res.json({ message: 'User updated successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating user' });
        }
    },

    // Delete a user by ID
    async deleteUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.destroy();
            const [result] = await sequelize.query('SELECT MAX(id) AS maxId FROM users');
            const maxId = result[0].maxId;
            const nextAutoIncrement = maxId ? maxId + 1 : 1; // If maxId is null (empty table), start from 1

            await sequelize.query(`ALTER TABLE users AUTO_INCREMENT = ${nextAutoIncrement}`);

            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting user' });
        }
    },
};

module.exports = UserController;
