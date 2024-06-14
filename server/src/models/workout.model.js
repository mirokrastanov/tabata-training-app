import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    preparation: { type: Number, required: true },
    break: { type: Number, required: true },
    cooldown: { type: Number, required: true },
    exercises: [
        {
            exercise: {
                type: String,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            orderIndex: {
                type: Number,
                required: true,
            },
        },
    ],
    // createdAt, updatedAt
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;