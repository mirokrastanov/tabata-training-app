import { Strategy as LocalStrategy } from 'passport-local';
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export default function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await User.findOne({ username }).lean();
            if (!user) return done(null, null, { msg: 'User not found' });

            const passwordCheck = await bcrypt.compare(password, user?.password || '');
            if (!user || !passwordCheck) return done(null, null, { msg: 'Invalid credentials' });

            delete user.password;
            return done(null, user);
        } catch (error) {
            return done(error, { msg: 'tyk'});
        } 
    };
    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id).lean();
            if (!user) return done(null, null, { msg: 'User not found' });

            delete user.password;
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    });
};

// export default passport.use(
//     // if using email for login
//     // new Strategy({ usernameField: 'email' }, (username, password, done) => {
//     new Strategy(async (username, password, done) => {
//         try {
//             const user = await User.findOne({ username }).lean();
//             if (!user) throw new Error('User not found');

//             const passwordCheck = bcrypt.compare(password, user?.password || '');
//             if (!user || !passwordCheck) throw new Error('Invalid credentials');

//             done(null, user);
//         } catch (error) {
//             done(error, null);
//         }
//     })
// );

// passport.serializeUser((user, done) => {
//     console.log('Serializing user');
//     console.log(user._id);

//     done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//     console.log('Deserializing user');
//     console.log(id);

//     try {
//         const user = await User.findById(id).lean();
//         if (!user) throw new Error('User not found');

//         done(null, user);
//     } catch (error) {
//         done(error, null);
//     }
// });