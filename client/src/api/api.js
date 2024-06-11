const hostname = 'http://localhost:8000';
const auth = '/api/auth';
const workouts = '/api/workouts';

export const api = {
    get: {
        workouts: {
            getOne: () => hostname + workouts + '/get-one',
            getMine: () => hostname + workouts + '/get-mine',
            getAll: () => hostname + workouts + '/get-all',
        },
    },
    post: {
        auth: {
            login: () => hostname + auth + '/login',
            signup: () => hostname + auth + '/signup',
            logout: () => hostname + auth + '/logout',
        },
        workouts: {
            create: () => hostname + workouts + '/create',
            edit: (id) => hostname + workouts + `/edit/${id}`,
            delete: (id) => hostname + workouts + `/delete/${id}`,
        },
    },
};


export async function requestor(url, options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }, body) {
    const response = await fetch(url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    return data;
};
