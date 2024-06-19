import express from 'express';
import homeRoutes from './routes/home.routes.js';
import authRoutes from './routes/auth.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import userRoute from './middlewares/userRoute.middleware.js';
import guestRoute from './middlewares/guestRoute.middleware.js';

const router = express.Router();

router.use(homeRoutes);
router.use('/api/auth', guestRoute, authRoutes);
router.use('/api/workouts', userRoute, workoutRoutes);


router.get('*', (req, res) => {
    req.session.redirected = true;
    res.redirect('/404?path=' + req.url);
});

export default router;