import express from 'express';
import homeRoutes from './routes/home.routes.js';
import authRoutes from './routes/auth.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import protectRoute from './middlewares/protectRoute.js';

const router = express.Router();

router.use(homeRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/workouts', protectRoute, workoutRoutes);


router.get('*', (req, res) => {
    res.redirect('/404?path=' + req.url);
});

export default router;