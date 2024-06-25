import { Strategy } from 'passport-local';
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export default function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await User.findOne({ username }).lean();
            if (!user) throw new Error('User not found');

            const passwordCheck = await bcrypt.compare(password, user?.password || '');
            if (!user || !passwordCheck) throw new Error('Invalid credentials');

            delete user.password;
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    };
    const localStrategy = new Strategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser);
    passport.use(localStrategy);
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id).lean();
            if (!user) throw new Error('User not found');

            delete user.password;
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};
