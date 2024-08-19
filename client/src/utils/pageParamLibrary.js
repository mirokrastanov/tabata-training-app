const defaultCase = {
    path: '*',
    title: 'Not Found',
    params: {}, // update based on DB fetched data (if any)
};
const home = {
    path: '/',
    title: 'Tabata Training',
    params: {}, // update based on DB fetched data (if any)
};
const workouts = {
    path: '/workouts',
    title: 'Workouts',
    params: { count: 24 }, // update based on DB fetched data (if any)
};
const settings = {
    path: '/settings',
    title: 'Settings',
    params: {}, // update based on DB fetched data (if any)
};


export {
    defaultCase,
    workouts,
    settings,
    home,

};