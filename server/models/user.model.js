import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: 'U',
    },
    // createdAt, updatedAt
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;