import { validationResult } from "express-validator";

// checks: notEmpty,
export const wildcard = (req, res) => {
    const { session: { redirected } } = req;
    // console.log(redirected);
    if (!redirected) {
        return res.status(404).send({ msg: '404 Not Found! Invalid path!', status: 404 });
    }
    req.session.redirected = false;

    const validation = validationResult(req);
    const { query: { path } } = req;
    // console.log(path, validation);

    res.status(404).send({
        msg: '404 Not Found! Invalid path!',
        status: 404,
        path,
        errors: validation.errors.length == 0 ? 'No Additional errors' : validation.errors,
    });
};