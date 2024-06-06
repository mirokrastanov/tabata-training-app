import express from 'express';

const router = express.Router();
// const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('home');
});

router.get('/404', (req, res) => {
    res.send('404');
});

export default router;