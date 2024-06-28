import mongoose from "mongoose";

const discordUserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
    },
    discordId: {
        type: String,
        required: [true, 'Discord ID is required'],
        unique: [true, 'Discord ID must be unique'],
    },
    // createdAt, updatedAt
}, { timestamps: true });

const DiscordUser = mongoose.model('DiscordUser', discordUserSchema);

export default DiscordUser;