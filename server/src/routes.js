import express from 'express';
import homeRoutes from './routes/home.routes.js';
import authRoutes from './routes/auth.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import userRoute from './middlewares/userRoute.middleware.js';
import keepSession from './middlewares/keepSession.middleware.js';

const router = express.Router();

router.use(keepSession);
router.use(homeRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/workouts', userRoute, workoutRoutes);


router.get('*', (req, res) => {
    req.session.redirected = true;
    res.redirect('/404?path=' + req.url);
});

export default router;