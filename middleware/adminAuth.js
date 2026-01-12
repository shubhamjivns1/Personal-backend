import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        // 2. Check against fixed admin
        if (email !== process.env.ADMIN_EMAIL)
            return res.status(401).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid email or password" });

        // 3. Login success
        res.status(200).json({
            message: "Login successful",
            admin: {
                email: process.env.ADMIN_EMAIL,
            },
        });
    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
