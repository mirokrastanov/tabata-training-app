import passport from "passport";
import { Strategy } from 'passport-local';
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export default passport.use(
    // if using email for login
    // new Strategy({ usernameField: 'email' }, (username, password, done) => {
    new Strategy(async (username, password, done) => {
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        try {
            const user = await User.findOne({ username }).lean();
            if (!user) throw new Error('User not found');

            const passwordCheck = bcrypt.compare(password, user?.password || '');
            if (!user || !passwordCheck) throw new Error('Invalid credentials');

            done(null, user);
        } catch (error) {
            done(error, null);
        }
    })
);

passport.serializeUser((user, done) => {
    console.log('Serializing user');
    console.log(user._id);

    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user');
    console.log(id);

    try {
        const user = await User.findById(id).lean();
        if (!user) throw new Error('User not found');

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});