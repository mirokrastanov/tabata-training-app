const defaultCase = {
    path: '*',
    title: 'Not Found',
    leftBtn: { icon: '', url: '' }, // update based on guest / user state
    rightBtn: { icon: 'FaHome', url: '/', text: 'Home' },
    params: {}, // update based on DB fetched data (if any)
};

const workouts = {
    path: '/',
    title: 'Workouts',
    leftBtn: { icon: '', url: '' }, // update based on guest / user state
    rightBtn: { icon: 'FaGear', url: '/settings', text: 'Settings' },
    params: { count: 24 }, // update based on DB fetched data (if any)
};
const settings = {
    path: '/settings',
    title: 'Settings',
    leftBtn: { icon: '', url: '' }, // update based on guest / user state
    rightBtn: { icon: 'FaHouse', url: '/', text: 'Home' },
    params: {}, // update based on DB fetched data (if any)
};


export {
    defaultCase,
    workouts,
    settings,

};