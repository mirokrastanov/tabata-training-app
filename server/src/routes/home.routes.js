import express from 'express';
import { query } from 'express-validator';
import { wildcard } from '../controllers/home.controller.js';
import { getPublicFiles } from '../utils/getters.js';
import { parseFiles } from '../utils/parsers.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        title: 'Tabata Training App - API',
        msg: 'For more information on how to use this API, check out the documentation linked below',
        documentation: 'https://github.com/mirokrastanov/tabata-training-app/blob/main/README.md',
        user: req.user || null,
        statusCheck: '/api/auth/status'
    });
});

router.get('/public', async (req, res) => {
    // const filePath = getInternalFilePath(req.publicPath, '/test1/index.html');
    // res.status(200).sendFile(filePath);
    const allFiles = await getPublicFiles(req.publicPath);
    const result = {};
    allFiles.forEach((f, i) => result[i] = `/assets/${f}`);
    res.status(200).json({
        simple: result,
        nested: parseFiles(result),
    });
});

router.get('/test', (req, res) => {
    const resultObject = {};
    resultObject.session = req.session;
    resultObject.id = req.session.id;
    req.session.visited = true; // to keep the initial session id for subsequent requests
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) {
            resultObject.sessionStoreError = err;
        }
        resultObject.sessionData = sessionData;
    });
    res.status(200).send({ msg: "Test endpoint", ...resultObject });
});

router.get('/404',
    query('path')
        .notEmpty().withMessage('No re-routing. Loaded /404 directly.'),
    wildcard);

export default router;