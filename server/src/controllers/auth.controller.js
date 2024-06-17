import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { genAvatar } from "../utils/avatarUtils.js";
import generateTokenAndSetCookie from "../utils/genToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) return res.status(400).json({ error: "Passwords don't match" });

        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ error: `User ${username} already exists` });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName, username, email,
            password: hashedPassword,
            profilePic: genAvatar(fullName),
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                // ...newUser,
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        // For Mongoose schema errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msg: "Validation Error",
                errors: Object.values(error.errors).map(val => val.message),
            });
        }
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error", msg: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passwordCheck = await bcrypt.compare(password, user?.password || '');

        if (!user || !passwordCheck) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

    } catch (error) {
        // For Mongoose schema errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msg: "Validation Error",
                errors: Object.values(error.errors).map(val => val.message),
            });
        }
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error", msg: error.message });
    }
};

export const logout = (req, res) => {
    try {
        // TODO: COMPLETE LATER
        // remove server session as well
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error", msg: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getUsers controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error", msg: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { params: { id: userId } } = req;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                msg: "User does not exist or the provided ID is invalid",
            });
        }
        console.log("Error in getUser controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error", msg: error.message });
    }
};