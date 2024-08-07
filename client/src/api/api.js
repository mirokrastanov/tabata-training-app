const hostname = 'http://localhost:8000';
const auth = '/api/auth';
const workouts = '/api/workouts';

export const urlBuilder = {
    workouts: {
        get: {
            one: (id) => hostname + workouts + `/get/one/${id}`,
            mine: () => hostname + workouts + '/get/mine',
            all: () => hostname + workouts + '/get/all',
        },
        post: {
            create: () => hostname + workouts + '/create',
        },
        put: {
            edit: (id) => hostname + workouts + `/edit/${id}`,
        },
        delete: {
            delete: (id) => hostname + workouts + `/delete/${id}`,
        },
    },
    auth: {
        get: {
            status: () => hostname + auth + '/status',
            discordLogin: () => hostname + auth + '/discord/login',
        },
        post: {
            login: () => hostname + auth + '/login',
            signup: () => hostname + auth + '/signup',
            logout: () => hostname + auth + '/logout',
        },
    },
};

async function request(method, url, data) {
    try {
        const options = {
            method,
            headers: {}
        };
        if (data != undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);
        let result;
        if (response.status != 204) {
            result = await response.json();
        }
        if (response.ok == false) {
            // if (response.status == 403) {
            //     localStorage.removeItem('userData');
            // }
            const error = result;
            throw error;
        }
        return result;
    } catch (err) {
        // alert(err.message);
        console.log(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');




const sampleWorkout = {
    creatorId: 'creatorId',
    preparation: 30,
    break: 15,
    cooldown: 60,
    exercises: [
        { exercise: 'Jumping Jacks', duration: 45, orderIndex: 1 },
    ],
};

