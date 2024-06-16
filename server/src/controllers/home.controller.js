import { validationResult } from "express-validator";

// checks: notEmpty,
export const wildcard = (req, res) => {
    const validation = validationResult(req);
    const { query: { path } } = req;
    // console.log(path, validation);

    res.status(404).send({
        msg: '404 Not Found! Invalid path!',
        path,
        errors: validation.errors.length == 0 ? 'No Additional errors' : validation.errors,
    });
};