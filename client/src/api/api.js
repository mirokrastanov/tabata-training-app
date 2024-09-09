const hostname = 'http://localhost:8000';
const auth = '/api/auth';
const workouts = '/api/workouts';

export const urlBuilder = {
    root: {
        get: {
            home: () => hostname,
        },
    },
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
            credentials: 'include', // to send cookies with the request
            headers: {}
        };

        if (data != undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        // console.log(response);

        // if (response.status === 204) {
        //     return null;
        // }
        // if (response.status == 403) {
        //     localStorage.removeItem('userData');
        // }
        const resData = await response.json();
        resData.ok = response.ok;
        return await resData;
    } catch (err) {
        return err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');




const sampleWorkout = {
    creatorId: 'creatorId',
    workoutName: 'HIIT 2.0',
    preparation: 30,
    break: 15,
    cooldown: 60,
    exercises: [
        { exercise: 'Jumping Jacks', duration: 45, orderIndex: 1 },
    ],
};

