const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

const isSuperuser = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const user = await User.findByPk(req.user.id);
        if (!user || user.role !== "superuser") {
            return res.status(403).json({ error: "Forbidden: Superuser access required" });
        }

        next(); // Proceed if superuser
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = { authenticateUser, isSuperuser };
