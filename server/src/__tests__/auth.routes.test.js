import { authStatus, getUser, getUsers, login, logout, signup } from "../controllers/auth.controller.js";
import User from "../models/user.model.js";
import passport from "passport";
import bcrypt from 'bcryptjs';
import { genAvatar } from "../utils/avatarUtils.js";

jest.mock('../models/user.model.js');
jest.mock('passport');
jest.mock('bcryptjs');
jest.mock('../utils/avatarUtils.js');

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

describe('getUsers', () => {
    let req, res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return all users if any', async () => {
        const users = [{ id: 'userId', name: 'John Doe' }, { id: 'userId2', name: 'Jane Doe' }];
        User.find.mockResolvedValue(users);

        await getUsers(req, res);

        expect(User.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should return 500 for any error cases', async () => {
        const error = new Error('Internal Server Error');
        User.find.mockRejectedValue(error);

        await getUsers(req, res);

        expect(User.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error', msg: error.message });
    });
});

describe('authStatus', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: null,
            session: { some: 'sessionData' },
            sessionID: 'someSessionID'
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return 200 and user information if the user is authenticated', () => {
        req.user = { id: 'userId', name: 'John Doe' };

        authStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ user: req.user, session: req.session, sessionID: req.sessionID });
    });

    it('should return 401 and null user if the user is not authenticated', () => {
        req.user = null;

        authStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ user: null, session: req.session, sessionID: req.sessionID });
    });
});

describe('logout', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: null,
            logout: jest.fn(),
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    it('should return 401 if the user is not logged in', () => {
        req.user = null;

        logout(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Cannot logout, because you are not logged in.', user: null });
    });

    it('should return 500 if req.logout encounters an error', () => {
        req.user = { id: '123' };

        const logoutError = new Error('Logout error');
        req.logout.mockImplementation((callback) => callback(logoutError));

        logout(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error", user: req.user });
    });

    it('should return 200 if logout is successful', () => {
        req.user = { id: '123' };
        req.logout.mockImplementation((callback) => callback(null));

        logout(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: "Logged out successfully", user: null });
    });

    it('should return 500 if an exception occurs', () => {
        req.user = { id: '123' };

        const error = new Error('Unexpected error');
        req.logout.mockImplementation(() => {
            throw error;
        });
        logout(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error", msg: error.message });
    });
});

describe('login', () => {
    let req, res;

    beforeEach(() => {
        req = {
            authMethod: 'local',
            login: jest.fn(),
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 if login is successful', async () => {
        const user = { id: 1, name: 'Test User' };

        passport.authenticate.mockImplementation((method, callback) => (req, res) => {
            callback(null, user, null);
        });

        req.login.mockImplementation((user, callback) => {
            callback(null);
        });

        await login(req, res);

        expect(passport.authenticate).toHaveBeenCalledWith('local', expect.any(Function));
        expect(req.login).toHaveBeenCalledWith(user, expect.any(Function));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should handle authentication error', async () => {
        const authError = new Error('Authentication failed');

        passport.authenticate.mockImplementation((method, callback) => (req, res) => {
            callback(authError, null, null);
        });

        await login(req, res);

        expect(passport.authenticate).toHaveBeenCalledWith('local', expect.any(Function));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error', msg: authError.message, user: null });
    });

    it('should handle login error', async () => {
        const user = { id: 1, name: 'Test User' };
        const loginError = new Error('Login failed');

        passport.authenticate.mockImplementation((method, callback) => (req, res) => {
            callback(null, user, null);
        });

        req.login.mockImplementation((user, callback) => {
            callback(loginError);
        });

        await login(req, res);

        expect(passport.authenticate).toHaveBeenCalledWith('local', expect.any(Function));
        expect(req.login).toHaveBeenCalledWith(user, expect.any(Function));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error', msg: loginError.message, user: null });
    });
});

describe('signup', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            login: jest.fn((user, callback) => callback(null))
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return 400 if passwords do not match', async () => {
        req.body = {
            fullName: 'Test User',
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            confirmPassword: 'password321'
        };

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Passwords don't match" });
    });

    it('should return 400 if user already exists', async () => {
        req.body = {
            fullName: 'Test User',
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        };

        User.findOne.mockResolvedValue({ username: 'testuser' });

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'User testuser already exists' });
    });

    it('should return 201 and create a new user if data is valid', async () => {
        req.body = {
            fullName: 'Test User',
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        };

        User.findOne.mockResolvedValue(null);
        bcrypt.genSalt.mockResolvedValue('somesalt');
        bcrypt.hash.mockResolvedValue('hashedpassword');
        genAvatar.mockReturnValue('someavatar');

        const saveMock = jest.fn().mockResolvedValue();
        const newUser = {
            fullName: 'Test User',
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'hashedpassword',
            profilePic: 'someavatar',
            save: saveMock
        };

        User.mockImplementation(() => newUser);

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(req.login).toHaveBeenCalledWith(newUser, expect.any(Function));
        expect(res.json).toHaveBeenCalledWith({
            fullName: 'Test User',
            username: 'testuser',
            email: 'testuser@example.com',
            profilePic: 'someavatar'
        });
    });

});