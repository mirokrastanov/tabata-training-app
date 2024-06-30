import { getUser } from "../controllers/auth.controller.js";
import User from "../models/user.model.js";

jest.mock('../models/user.model.js');

describe('getUser by ID', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: 'userId' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return the user if found', async () => {
        const user = { id: 'userId', name: 'John Doe' };
        User.findById.mockResolvedValue(user);

        await getUser(req, res);

        expect(User.findById).toHaveBeenCalledWith('userId');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should return 404 if user not found', async () => {
        User.findById.mockResolvedValue(null);

        await getUser(req, res);

        expect(User.findById).toHaveBeenCalledWith('userId');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ msg: 'User not found', user: null });
    });

    it('should return 400 if invalid user ID is provided', async () => {
        const error = new Error('CastError');
        error.name = 'CastError';
        User.findById.mockRejectedValue(error);

        await getUser(req, res);

        expect(User.findById).toHaveBeenCalledWith('userId');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ msg: 'User does not exist or the provided ID is invalid' });
    });

    it('should return 500 for any other errors', async () => {
        const error = new Error('Internal Server Error');
        User.findById.mockRejectedValue(error);

        await getUser(req, res);

        expect(User.findById).toHaveBeenCalledWith('userId');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error', msg: error.message });
    });
});