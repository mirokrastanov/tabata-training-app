import express from 'express';
import {
    createWorkout, deleteWorkout, editWorkout, getAllWorkouts, getMyWorkouts, getOneWorkout
} from '../controllers/workout.controller.js';

const router = express.Router();

router.get('/get/one/:id', getOneWorkout);
router.get('/get/mine', getMyWorkouts);
router.get('/get/all', getAllWorkouts);

router.post('/create', createWorkout);
router.put('/edit/:id', editWorkout);
router.delete('/delete/:id', deleteWorkout);


export default router;