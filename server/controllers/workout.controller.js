import { workoutManager } from '../managers/workout.manager.js';
import Workout from '../models/workout.model.js';

export const createWorkout = async (req, res) => {
    try {
        const creatorId = req.user._id;
        const newWorkout = new Workout({
            creatorId,
            ...req.body,
        });
        if (newWorkout) {
            await workoutManager.create(newWorkout);
        }
        res.status(201).json(newWorkout);
    } catch (error) {
        console.log('Error in createWorkout', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const editWorkout = async (req, res) => {
    try {
        const { id: workoutId } = req.params;
        const creatorId = req.user._id;
        const newWorkout = new Workout({
            creatorId,
            ...req.body,
        });
        if (newWorkout) {
            await workoutManager.edit(workoutId, newWorkout);
        }
        res.status(201).json(newWorkout);
    } catch (error) {
        console.log('Error in editWorkout', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteWorkout = async (req, res) => {
    try {
        const { id: workoutId } = req.params;
        await workoutManager.delOne(workoutId);
        res.status(200).json('Workout deleted');
    } catch (error) {
        console.log('Error in deleteWorkout', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getOneWorkout = async (req, res) => {
    try {
        const { id: workoutId } = req.params;
        const workout = await workoutManager.getOne(workoutId);
        res.status(200).json(workout);
    } catch (error) {
        console.log('Error in getOneWorkout', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getMyWorkouts = async (req, res) => {
    try {
        const creatorId = req.user._id;
        const workouts = await workoutManager.getMine(creatorId);
        if (!workouts) {
            return res.status(200).json([]);
        }
        res.status(200).json(workouts);
    } catch (error) {
        console.log('Error in getMyWorkouts');
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await workoutManager.getAll();
        if (!workouts) {
            return res.status(200).json([]);
        }
        res.status(200).json(workouts);
    } catch (error) {
        console.log('Error in getAllWorkouts');
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
