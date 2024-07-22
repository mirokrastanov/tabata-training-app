const hostname = 'http://localhost:8000';
const auth = '/api/auth';
const workouts = '/api/workouts';

export const api = {
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


export async function requestor(url, options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }, body) {
    const response = await fetch(url, {
        ...options,
        body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    return data;
};



// import mongoose from "mongoose";

// const workoutSchema = new mongoose.Schema({
//     creatorId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     preparation: { type: Number, required: true },
//     break: { type: Number, required: true },
//     cooldown: { type: Number, required: true },
//     exercises: [
//         {
//             exercise: {
//                 type: String,
//                 required: true,
//             },
//             duration: {
//                 type: Number,
//                 required: true,
//             },
//             orderIndex: {
//                 type: Number,
//                 required: true,
//             },
//         },
//     ],
//     // createdAt, updatedAt
// }, { timestamps: true });

// const Workout = mongoose.model('Workout', workoutSchema);

// export default Workout;