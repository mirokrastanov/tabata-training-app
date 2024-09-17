import { createContext, useState, useEffect, useContext } from "react";
import { usePage } from "./PageContext";
import { getWorkoutIdFromQuery } from "../utils/queryParamMethods";
import { exerciseLibrary, workoutPresets } from "../utils/workoutPresets";
import { useAuth } from "./AuthContext";
import * as api from '../api/api.js';
import { useParams } from "react-router-dom";


/**
 * @typedef WorkoutContextData
 * @property {Array} intervals
 * @property {String} prep
 * @property {function} setPrep
 * @property {String} rest
 * @property {function} setRest
 * @property {String} cooldown
 * @property {function} setCooldown
 * @property {String} workoutName
 * @property {function} setWorkoutName
 * @property {function} loadWorkoutPreset
 * @property {function} updateInterval
 * @property {function} addRandomInterval
 * @property {function} deleteInterval
 * @property {function} getIntervalIndex
 * @property {function} resetStateFull
 * @property {function} addEmptyInterval
 * @property {function} createWorkoutInDB
 * @property {function} fetchAllMyWorkouts
 * @property {null | Object} fetchedWorkout
 * @property {null | Array} myFetchedWorkouts
 * @property {function} fetchWorkout
 * @property {null | String} currentLoadedID
 * @property {function} forceRefresh
 */




const WorkoutContext = createContext();

/**
 * @returns {WorkoutContextData}
 */
export function useWorkout() {
    return useContext(WorkoutContext);
}

export function WorkoutProvider({ children }) {
    // FETCHED STATE
    const [myFetchedWorkouts, setMyFetchedWorkouts] = useState(null);
    const [fetchedWorkout, setFetchedWorkout] = useState(null);
    // LOCAL STATE
    const [nextAvailableID, setNextAvailableID] = useState(1); // 0 reserved for prep
    const [currentLoadedID, setCurrentLoadedID] = useState(null);
    const [intervals, setIntervals] = useState([]);
    const [prep, setPrep] = useState('0');
    const [rest, setRest] = useState('0'); // BREAK STATE to be shared across all break service intervals
    const [cooldown, setCooldown] = useState('0');
    const [workoutName, setWorkoutName] = useState('Workout Title');
    // FROM OTHER CONTEXTS
    const { user } = useAuth();
    const { location } = usePage();

    useEffect(() => {
        const p = location.pathname;
        const [edit, details, create, workouts] = [
            p.includes('/edit/'), p.includes('/details/'), p.includes('/create'), p === '/workouts'
        ];
        if (!workouts && myFetchedWorkouts != null) return setMyFetchedWorkouts(null);
        if (edit || details) {
            const workoutID = p.split('/')[3];
            if (workoutID == currentLoadedID) return;
        }
        resetStateFull();
    }, [location]);

    async function forceRefresh(workoutID) {
        resetStateFull();
        await fetchWorkout(workoutID);
    }

    async function fetchAllMyWorkouts() {
        // return setMyFetchedWorkouts([]);
        try {
            const creatorId = user?._id;
            const address = api.urlBuilder.workouts.get.mine();
            const requestData = await api.get(address);
            if (!requestData.ok) throw requestData;

            console.log('My workouts: \n', requestData);
            setMyFetchedWorkouts(requestData);
            return requestData;
        } catch (error) {
            return error;
        }
    }

    async function fetchWorkout(workoutID) {
        try {
            const creatorId = user?._id;
            const address = api.urlBuilder.workouts.get.one(workoutID);
            const requestData = await api.get(address);
            if (!requestData.ok) throw requestData;
            console.log('Workout fetched: \n', requestData);

            const exercises = requestData.exercises.slice(0);
            const sorted = exercises.sort((a, b) => Number(a.orderIndex) - Number(b.orderIndex));
            const lastEl = sorted[sorted.length - 1];
            const lastIndex = lastEl.orderIndex;

            setNextAvailableID(Number(lastIndex) + 1);
            setIntervals(sorted);
            setWorkoutName(requestData.workoutName);
            setPrep(String(requestData.preparation));
            setRest(String(requestData.break));
            setCooldown(String(requestData.cooldown));
            setCurrentLoadedID(workoutID);

            setFetchedWorkout(requestData);
            return requestData;
        } catch (error) {
            return error;
        }
    }

    // ONLY USE inside Create Workout Page
    function loadWorkoutPreset(preset = 'initial') {
        resetStateFull();
        const p = workoutPresets[preset];
        const lastIndex = p.intervals[p.intervals.length - 1].orderIndex;
        setNextAvailableID(lastIndex + 1);
        setIntervals(p.intervals);
        setWorkoutName(p.workoutName);
        setPrep(p.prep);
        setRest(p.rest);
        setCooldown(p.cooldown);
    }

    function addRandomInterval() {
        const exercises = exerciseLibrary.length;
        const random = Math.floor(Math.random() * (exercises + 1));
        const e = exerciseLibrary[random];
        createInterval(e.exercise, e.duration);
    }

    function addEmptyInterval() {
        createInterval();
    }

    async function createWorkoutInDB() {
        const workout = {
            creatorId: user?._id,
            workoutName: workoutName,
            preparation: Number(prep),
            break: Number(rest),
            cooldown: Number(cooldown),
            exercises: intervals,
        };
        try {
            const address = api.urlBuilder.workouts.post.create();
            const requestData = await api.post(address, workout);
            if (!requestData.ok) throw requestData;

            console.log('Workout created. Response: \n', requestData, requestData.ok);

            return requestData;
        } catch (error) {
            return error;
        }
    }

    async function updateWorkoutInDB(workoutID, workout) {
        // translate the intervals to workout object fit for the DB
    }

    async function deleteWorkoutFromDB(workoutID) { }

    function createInterval(exercise = '', duration = '30') {
        const orderIndex = genID();
        const interval = { duration, exercise, orderIndex };
        setIntervals([...intervals, interval]);
    }

    function updateInterval(orderIndex, exercise, duration) {
        const properties = {};
        const saved = intervals.find(x => x.orderIndex === orderIndex);
        if (saved.exercise != exercise) properties.exercise = exercise;
        if (saved.duration != duration) properties.duration = duration;
        const isMatch = (interval) => interval.orderIndex === orderIndex;

        setIntervals((prevIntervals) =>
            prevIntervals.map((interval) =>
                isMatch(interval) ? { ...interval, ...properties } : interval
            )
        );
    }

    function deleteInterval(orderIndex) {
        const filteredIntervals = intervals.filter(interval => interval.orderIndex !== orderIndex);
        setIntervals(filteredIntervals);
    }

    function getIntervalIndex(orderIndex) {
        return intervals.indexOf(intervals.find(x => x.orderIndex === orderIndex));
    }

    // ORDER IDs:
    // - when an interval is deleted - re-assign all order IDs again
    // - when an interval is reordered up - switch orderID of the upper el with the current


    // TODO: FIGURE OUT how to get edit or view page's current IDs, intervals and populating them to the context state
    // Pull the information from the database using the DB ID for the workout and use that to populate the
    // intervals / create a state for them here



    function resetStateFull() {
        setNextAvailableID(1);
        setIntervals([]);
        setFetchedWorkout(null);
        setMyFetchedWorkouts(null);
        setCurrentLoadedID(null);
        setWorkoutName('Workout Title');
        setPrep('30');
        setRest('15');
        setCooldown('60');
    }

    function genID() {
        const current = nextAvailableID;
        setNextAvailableID(current + 1);
        return String(current);
    }





    // ADD STATISTICS LOGGER FUNC / for history and recent history / total intervals, etc... figure it out
    // need to create back end models as well - figure it out

    const ContextData = {
        intervals,
        prep, setPrep,
        rest, setRest,
        cooldown, setCooldown,
        workoutName, setWorkoutName,
        loadWorkoutPreset,
        updateInterval,
        addRandomInterval,
        deleteInterval,
        getIntervalIndex,
        resetStateFull,
        addEmptyInterval,
        createWorkoutInDB,
        fetchAllMyWorkouts,
        fetchedWorkout,
        myFetchedWorkouts,
        fetchWorkout,
        currentLoadedID,
        forceRefresh,

    };

    return (
        <WorkoutContext.Provider value={ContextData}>
            {children}
        </WorkoutContext.Provider>
    );
};