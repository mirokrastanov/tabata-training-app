import express from 'express';
import homeRoutes from './routes/home.routes.js';
import authRoutes from './routes/auth.routes.js';

const router = express.Router();

router.use(homeRoutes);
router.use('/api/auth', authRoutes);


router.get('*', (req, res) => {
    res.redirect('/404');
});

export default router;