import { workoutManager } from '../managers/workout.manager.js';
import Workout from '../models/workout.model.js';

export const createWorkout = async (req, res) => {
    try {
        const { body } = req;
        const creatorId = req.user._id;
        const newWorkout = new Workout({
            creatorId,
            ...body,
        });
        if (newWorkout) {
            await workoutManager.create(newWorkout);
        }
        res.status(201).json(newWorkout);
    } catch (error) {
        console.log('Error in createWorkout', error.message);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
};

export const editWorkout = async (req, res) => {
    try {
        const { body, params: { id: workoutId } } = req;
        const creatorId = req.user._id;
        const currentWorkout = await workoutManager.getOne(workoutId);
        const newWorkout = new Workout({
            creatorId,
            ...currentWorkout,
            ...body,
        });
        if (newWorkout) {
            await workoutManager.edit(workoutId, newWorkout);
        }
        res.status(201).json(newWorkout);
    } catch (error) {
        console.log('Error in editWorkout', error.message);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
};

export const deleteWorkout = async (req, res) => {
    try {
        const { params: { id: workoutId } } = req;
        await workoutManager.delOne(workoutId);
        res.status(200).json('Workout deleted');
    } catch (error) {
        console.log('Error in deleteWorkout', error.message);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
};

export const getOneWorkout = async (req, res) => {
    try {
        const { params: { id: workoutId } } = req;
        const workout = await workoutManager.getOne(workoutId);
        res.status(200).json(workout);
    } catch (error) {
        console.log('Error in getOneWorkout', error.message);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
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
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
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
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
};
