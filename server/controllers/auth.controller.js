import User from "../models/user.model.js";
import { genAvatar } from "../utils/avatarUtils.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // HASH Password

        const newUser = new User({
            fullName,
            username,
            password,
            profilePic: genAvatar(fullName),
        });

        if (newUser) {

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passwordCheck = true; // Add password check

        if (!user || !passwordCheck) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // gen token
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        // clear cookie
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};