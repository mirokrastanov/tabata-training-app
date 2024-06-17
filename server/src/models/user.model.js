import mongoose from "mongoose";
import { isEmailValid } from "../utils/regexTests.js";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, 'Full Name is required'],
        maxlength: [20, 'Full Name must be 20 characters max'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        validate: {
            validator: isEmailValid,
            message: props => `${props.value} is not a valid email address!`
        },
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [10, 'Username must be 10 characters max'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    profilePic: {
        type: String,
        default: 'U',
    },
    // createdAt, updatedAt
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;