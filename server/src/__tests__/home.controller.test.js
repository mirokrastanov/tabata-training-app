import { validationResult } from "express-validator";
import { wildcard } from "../controllers/home.controller.js";

jest.mock('express-validator');

describe('wildcard', () => {
    let req, res;

    beforeEach(() => {
        req = {
            session: {
                redirected: false
            },
            query: {
                path: 'some/path'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it('should return a 404 error if redirected is false', () => {
        req.session.redirected = false;

        wildcard(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            msg: '404 Not Found! Invalid path!',
            status: 404
        });
    });

    it('should return 404 with validation errors if redirected is true and validation errors exist', () => {
        req.session.redirected = true;
        validationResult.mockReturnValue({
            errors: [{ msg: 'Error 1' }, { msg: 'Error 2' }]
        });

        wildcard(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            msg: '404 Not Found! Invalid path!',
            status: 404,
            path: 'some/path',
            errors: [{ msg: 'Error 1' }, { msg: 'Error 2' }]
        });
    });

    it('should return 404 with no errors message if redirected is true and there are no validation errors', () => {
        req.session.redirected = true;
        validationResult.mockReturnValue({
            errors: []
        });

        wildcard(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            msg: '404 Not Found! Invalid path!',
            status: 404,
            path: 'some/path',
            errors: 'No Additional errors'
        });
    });
});
