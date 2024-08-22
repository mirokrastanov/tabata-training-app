import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { genAvatar } from "../utils/avatarUtils.js";
import passport from "passport";

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) return res.status(400).json({ error: "Passwords don't match" });
        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ error: `User ${username} already exists` });

        // ADD verifications for the rest

        // VERIFY INPUTS - return any errors and display them on the form + display a toast
        // fullName: max 20
        // email: valid email (do check on the FRONT END)
        // username: 3 - 10
        // password: >6
        // confirmPassword: match password

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
            req.login(newUser, (err) => {
                if (err) throw err;
                res.status(201).json({ user: newUser, session: req.session, sessionID: req.sessionID });
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        // For Mongoose schema errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                msg: `Validation Error${errors.length < 2 ? '' : 's'}`,
                errors,
            });
        } else if (error.code === 11000) {
            const entries = Object.keys(error.keyValue);
            if (entries.length < 2) return res.status(400).json({ msg: `${entries[0]} already in use.` });
            return res.status(400).json({ msg: `${entries.join(', ')} already in use.` });
        }
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error", msg: error.message, errObj: error });
    }
};

export const login = async (req, res) => {
    const authMethod = req.authMethod || 'local';
    console.log(req.body);
    // ADD verifications

    // VERIFY INPUTS - return any errors and display them on the form + display a toast
    // fullName: max 20
    // email: valid email (do check on the FRONT END)
    // username: 3 - 10
    // password: >6
    // confirmPassword: match password

    passport.authenticate(authMethod, (err, user, info) => {
        try {
            if (err) throw err;

            req.login(user, (err) => {
                try {
                    if (err) throw err;

                    req.authMethod = undefined;
                    res.status(200).json({ user, session: req.session, sessionID: req.sessionID });
                } catch (error) {
                    console.log(error.message);
                    req.authMethod = undefined;
                    res.status(500).json({ error: "Internal Server Error", msg: error.message, user: null });
                }
            });
        } catch (error) {
            console.log("Error in login controller: ", error.message);
            req.authMethod = undefined;
            res.status(500).json({ error: "Internal Server Error", msg: error.message, user: null });
        }
    })(req, res);
};

export const logout = (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ msg: "Cannot logout, because you are not logged in.", user: null });

        req.logout((err) => {
            if (err) return res.status(500).json({ error: "Internal Server Error", user: req.user });
            res.status(200).json({ msg: "Logged out successfully", user: null });
        });
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error", msg: error.message });
    }
};

export const authStatus = (req, res) => {
    res.status(req.user ? 200 : 401).json({ user: req.user || null, session: req.session, sessionID: req.sessionID });
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
        if (!user) return res.status(404).json({ msg: "User not found", user: null });
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

