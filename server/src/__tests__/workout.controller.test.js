import {
    createWorkout,
    deleteWorkout,
    editWorkout,
    getAllWorkouts,
    getMyWorkouts,
    getOneWorkout,
} from '../controllers/workout.controller.js';
import { workoutManager } from '../managers/workout.manager.js';
import Workout from '../models/workout.model.js';

jest.mock('../managers/workout.manager.js');
jest.mock('../models/workout.model.js');

describe('getAllWorkouts', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return an empty array if no workouts are found', async () => {
        workoutManager.getAll.mockResolvedValue(null);

        await getAllWorkouts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should return all workouts if they are found', async () => {
        const mockWorkouts = [{ id: 1, name: 'Workout 1' }, { id: 2, name: 'Workout 2' }];
        workoutManager.getAll.mockResolvedValue(mockWorkouts);

        await getAllWorkouts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockWorkouts);
    });

    it('should return a 500 status code and error message if an error occurs', async () => {
        const mockError = new Error('Something went wrong');
        workoutManager.getAll.mockRejectedValue(mockError);

        await getAllWorkouts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal Server Error', error: mockError.message });
    });
});

describe('getMyWorkouts', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {
                _id: 'mockUserId'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return an empty array if no workouts are found', async () => {
        workoutManager.getMine.mockResolvedValue(null);

        await getMyWorkouts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should return the workouts if they are found', async () => {
        const mockWorkouts = [{ id: 1, name: 'Workout 1' }, { id: 2, name: 'Workout 2' }];
        workoutManager.getMine.mockResolvedValue(mockWorkouts);

        await getMyWorkouts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockWorkouts);
    });

    it('should return a 500 status code and error message if an error occurs', async () => {
        const mockError = new Error('Something went wrong');
        workoutManager.getMine.mockRejectedValue(mockError);

        await getMyWorkouts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal Server Error', error: mockError.message });
    });
});

describe('getOneWorkout', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                id: 'mockWorkoutId'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return the workout if it is found', async () => {
        const mockWorkout = { id: 'mockWorkoutId', name: 'Workout 1' };
        workoutManager.getOne.mockResolvedValue(mockWorkout);

        await getOneWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockWorkout);
    });

    it('should return a 500 status code and error message if an error occurs', async () => {
        const mockError = new Error('Something went wrong');
        workoutManager.getOne.mockRejectedValue(mockError);

        await getOneWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal Server Error', error: mockError.message });
    });
});

describe('deleteWorkout', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                id: 'mockWorkoutId'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should delete the workout and return a success message', async () => {
        workoutManager.delOne.mockResolvedValue();

        await deleteWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Workout deleted');
    });

    it('should return a 500 status code and error message if an error occurs', async () => {
        const mockError = new Error('Something went wrong');
        workoutManager.delOne.mockRejectedValue(mockError);

        await deleteWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal Server Error', error: mockError.message });
    });
});

describe('editWorkout', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: { name: 'Updated Workout' },
            params: { id: 'mockWorkoutId' },
            user: { _id: 'mockUserId' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should update the workout and return the new workout', async () => {
        const currentWorkout = { id: 'mockWorkoutId', name: 'Old Workout' };
        const newWorkout = { id: 'mockWorkoutId', name: 'Updated Workout', creatorId: 'mockUserId' };

        workoutManager.getOne.mockResolvedValue(currentWorkout);
        workoutManager.edit.mockResolvedValue();
        Workout.mockImplementation((data) => data);

        await editWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newWorkout);
    });

    it('should return a 500 status code and error message if an error occurs', async () => {
        const mockError = new Error('Something went wrong');
        workoutManager.getOne.mockRejectedValue(mockError);

        await editWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal Server Error', error: mockError.message });
    });
});

describe('createWorkout', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: { name: 'New Workout' },
            user: { _id: 'mockUserId' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should create a new workout and return it', async () => {
        const newWorkout = { name: 'New Workout', creatorId: 'mockUserId' };

        Workout.mockImplementation((data) => data);
        workoutManager.create.mockResolvedValue();

        await createWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newWorkout);
    });

    it('should return a 500 status code and error message if an error occurs', async () => {
        const mockError = new Error('Something went wrong');
        workoutManager.create.mockRejectedValue(mockError);

        await createWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal Server Error', error: mockError.message });
    });
});
