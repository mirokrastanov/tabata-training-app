import Workout from "../models/workout.model.js";

export const createWorkout = async (req, res) => {
    try {
        const { workout } = req.body;
        const creatorId = req.user._id;
        const newWorkout = new Workout({
            creatorId,
            workout,
        });

        if (newWorkout) {
            await newWorkout.save();
        }
        res.status(201).json(newWorkout);

    } catch (error) {
        console.log('Error in createWorkout', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

export const getMyWorkouts = async (req, res) => {
    try {
        const creatorId = req.user._id;
        const workouts = await Workout.find({ creatorId });

        if (!workouts) {
            return res.status(200).json([]);
        }

        res.status(200).json(workouts);

    } catch (error) {
        console.log('Error in getMyWorkouts');
        res.status(500).json({ error: 'Internal Server Error' });
    }
};