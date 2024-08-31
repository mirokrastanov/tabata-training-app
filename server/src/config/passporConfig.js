import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as DiscordStrategy } from 'passport-discord';
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import DiscordUser from '../models/discordUser.model.js';
import genError from '../utils/genError.js';
dotenv.config();

const localOptions = { usernameField: 'username', passwordField: 'password' };
const localStrategy = new LocalStrategy(localOptions, async (username, password, done) => {
    try {
        const user = await User.findOne({ username }).lean();
        if (!user) throw genError('User not found', { source: 'LocalStrategy', user });

        const passwordCheck = await bcrypt.compare(password, user?.password || '');
        if (!user || !passwordCheck) throw genError('Invalid credentials', { source: 'LocalStrategy', user });

        delete user.password;
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

const discordOptions = {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_SECRET,
    callbackURL: process.env.DISCORD_REDIRECT_URI,
    scope: ['identify', 'email'], // what to pull from discord - each requires permission
};
const discordStrategy = new DiscordStrategy(discordOptions, async (accessToken, refreshToken, profile, done) => {
    let user;
    try {
        console.log('Fetched profile data from Discord:\n', profile);
        user = await DiscordUser.findOne({ discordId: profile.id });
        console.log('Does user exist in db:\n', user ? true : false);

        if (user) {
            user = await DiscordUser.findByIdAndUpdate(user._id, {
                discordId: profile.id,
                username: profile.username,
                avatarId: profile.avatar,
                fullName: profile.global_name,
                email: profile.email,
                provider: profile.provider,
                fetchedAt: profile.fetchedAt,
            }, { new: true, upsert: true }).lean();
            console.log('Found in db and updated user:\n', user);
        } else {
            user = new DiscordUser({
                discordId: profile.id,
                username: profile.username,
                avatarId: profile.avatar,
                fullName: profile.global_name,
                email: profile.email,
                provider: profile.provider,
                fetchedAt: profile.fetchedAt,
            });
            await user.save();
            user = await DiscordUser.findOne({ discordId: profile.id }).lean();
            console.log('New Discord User created:\n', user);
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).lean() || await DiscordUser.findById(id).lean();
        if (!user) throw genError('User not found', { source: 'deserializeUser', user });

        delete user.password;
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export {
    localStrategy,
    discordStrategy,
};