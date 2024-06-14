import express from 'express';

const router = express.Router();
// const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.status(200).send({ msg: 'Home', path: req.url });
});


router.get('/test', (req, res) => {
    const resultObject = {};
    resultObject.session = req.session;
    resultObject.id = req.session.id;
    req.session.visited = true; // to keep the initial session id for subsequent requests
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) {
            // throw err;
            resultObject.sessionStoreError = err;
        }
        resultObject.sessionData = sessionData;
    });
    res.status(200).send({ msg: "Test endpoint", ...resultObject });
});



router.get('/404', (req, res) => {
    res.status(200).send({ msg: '404 Not Found! Invalid path!', path: req.query.path });
});

export default router;