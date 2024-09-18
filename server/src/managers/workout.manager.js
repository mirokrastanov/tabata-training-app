import Workout from '../models/workout.model.js';

const create = (workoutData) => Workout.create(workoutData);

const getAll = () => Workout.find().populate('creatorId');

const getMine = (creatorId) => Workout.find({ 'creatorId': creatorId });

const getOne = (workoutId) => Workout.findById(workoutId);

const delOne = (workoutId) => Workout.findByIdAndDelete(workoutId);

const edit = (workoutId, workoutData) => Workout.findByIdAndUpdate(workoutId, workoutData);

export const workoutManager = {
    create,
    getAll,
    getMine,
    getOne,
    delOne,
    edit,
};