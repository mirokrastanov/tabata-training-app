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
            fullName,
            username,
            email,
            password: hashedPassword,
            profilePic: genAvatar(fullName),
        });

        if (newUser) {
            await newUser.save();

            newUser.password = undefined;
            req.session.user = newUser;
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json(newUser);

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
        generateTokenAndSetCookie(req.user._id, res);
        res.status(200).json(req.user);
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

export const authStatus = (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log(session);
    });

    if (!req.session.user) return res.status(401).send({ msg: 'Not Authenticated', status: false, user: null });
    res.status(200).send({ msg: 'Authenticated', status: true, user: req.session.user });
};