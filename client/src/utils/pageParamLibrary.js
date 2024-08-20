export const defaultCase = {
    path: '*',
    title: 'Not Found',
    params: {},
};
export const home = {
    path: '/',
    title: 'Tabata Training',
    params: {},
};
export const workouts = {
    path: '/workouts',
    title: 'Workouts',
    params: { count: 24 },
};
export const settings = {
    path: '/settings',
    title: 'Settings',
    params: {},
};
export const signup = {
    path: '/user/signup',
    title: 'Sign Up',
    params: {},
};
export const signin = {
    path: '/user/signin',
    title: 'Sign In',
    params: {},
};
export const profile = {
    path: '/user/profile',
    title: 'Profile',
    params: {},
};
export const createWorkout = {
    path: '/workouts/create',
    title: 'Create Workout',
    params: {},
};
export const editWorkout = {
    path: '/workouts/edit/:id', // handle this differently at the PageContext level / adjust logic
    title: 'Edit Workout',
    params: {},
};
export const viewWorkout = {
    path: '/workouts/details/:id',
    title: 'Workout Details',
    params: {},
};
