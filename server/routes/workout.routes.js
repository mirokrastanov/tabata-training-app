import express from 'express';
import { createWorkout } from '../controllers/workout.controller.js';

const router = express.Router();

router.post('/create', createWorkout);



export default router;