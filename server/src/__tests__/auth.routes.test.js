import { getUser } from "../controllers/auth.controller.js";

const mockRequest = {
    params: { id: '666fe3ed5edc572d762d9287' },

};
const mockResponse = {
    status: () => {
        return {
            json: jest.fn(),
        };
    },
};

describe('Get users', () => {
    it('Should get user by id', () => {
        //==>   /api/auth/get-user/:id
        getUser(mockRequest, mockResponse);


    });
});