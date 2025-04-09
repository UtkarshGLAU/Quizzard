import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { name, email, phoneNumber, avatar } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name, email, phoneNumber, avatar });
            await user.save();
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true, // ✅ Always true in HTTPS (Render)
            sameSite: "None", // ✅ Needed for cross-site cookie usage
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                avatar: user.avatar,
            },
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-__v");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
};
