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

    
});