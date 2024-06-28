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
    scope: ['identify', 'email', 'guilds'], // what to pull from discord - each requires permission
};
const discordStrategy = new DiscordStrategy(discordOptions, async (accessToken, refreshToken, profile, done) => {
    let user;
    try {
        user = await DiscordUser.findOne({ discordId: profile.id });
        if (!user) {
            const newUser = new DiscordUser({ discordId: profile.id, username: profile.username, profile });
            await newUser.save();

            user = await DiscordUser.findOne({ discordId: profile.id }).lean();
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