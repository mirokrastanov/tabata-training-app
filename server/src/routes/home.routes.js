import express from 'express';

const router = express.Router();
// const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('home');
});


router.get('/test', (req, res) => {
    const resultObject = {};
    console.log(req.session);
    resultObject.session = req.session;
    console.log(req.session.id);
    resultObject.id = req.session.id;
    req.session.visited = true; // to keep the initial session id for subsequent requests
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(sessionData);
        resultObject.sessionData = sessionData;
    });
    res.status(200).send({ msg: "Test endpoint", ...resultObject });
});



router.get('/404', (req, res) => {
    res.send('404');
});

export default router;