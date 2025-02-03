const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
        req.user = decoded; // Store user data in request
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

async function isSuperuser(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findByPk(decoded.id);

        if (!user || user.role !== "superuser") {
            return res.status(403).json({ error: "Forbidden: Superuser access required" });
        }

        req.user = user; // Store user in request
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
}

module.exports = { authenticateUser, isSuperuser };
