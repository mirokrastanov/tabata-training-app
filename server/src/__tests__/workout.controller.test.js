import { getAllWorkouts } from '../controllers/workout.controller.js';
import { workoutManager } from '../managers/workout.manager.js';

jest.mock('../managers/workout.manager.js');

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

