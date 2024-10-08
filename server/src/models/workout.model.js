import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    workoutName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    preparation: { type: Number, required: true },
    break: { type: Number, required: true },
    cooldown: { type: Number, required: true },
    exercises: [
        {
            exercise: {
                type: String,
                required: [true, 'Exercise name must be provided'],
            },
            duration: {
                type: String,
                required: true,
            },
            orderIndex: {
                type: String,
                required: true,
            },
        },
    ],
    // createdAt, updatedAt
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;