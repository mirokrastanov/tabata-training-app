import { createContext, useState, useEffect, useContext } from "react";
import { usePage } from "./PageContext";
import { getWorkoutIdFromQuery } from "../utils/queryParamMethods";

// /**
//  * @typedef WorkoutContextData
//  * @property {null | Object} location
//  * @property {null | Object} pageParams
//  * @property {function} updatePageParams
//  */
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
    const [workout, setWorkout] = useState(null);
    // LOCAL STATE
    const [nextAvailableID, setNextAvailableID] = useState(1); // 0 reserved for prep
    const [currentLoadedID, setCurrentLoadedID] = useState(null);
    const [intervals, setIntervals] = useState([]);
    const [prep, setPrep] = useState('0');
    const [rest, setRest] = useState('0'); // BREAK STATE to be shared across all break service intervals
    const [cooldown, setCooldown] = useState('0');
    const [workoutName, setWorkoutName] = useState('Workout Title');
    // FROM OTHER CONTEXTS
    const { location } = usePage();

    useEffect(() => {
        const isWorkoutPage = location.pathname.includes('workout');
        const workoutID = getWorkoutIdFromQuery(location);
        if (!isWorkoutPage || workoutID == currentLoadedID) return;

        resetStateFull();
    }, [location]);

    async function forceRefresh(workoutID) {
        resetStateFull();
        await fetchWorkout(workoutID);
    }

    async function fetchWorkout(workoutID) {
        // fetch
        const sampleWorkout = { // REPLACE WITH REAL FETCH
            creatorId: 'creatorId',
            workoutName: 'HIIT 2.0',
            preparation: 30,
            break: 15,
            cooldown: 60,
            exercises: [
                { exercise: 'Jumping Jacks', duration: 45, orderIndex: 1 },
            ],
        };
        // sort exercises array by orderIndex in ascending order
        // get the orderIndex of the last item and 
        //// set nextAvailableID to be (last+1)
        // set workout
        // set currentLoadedID from workout (fetched)
        // push Prep to intervals
        const sampleInterval = {
            type: 'preparation',
            duration: 30,
            exercise: '',
            orderIndex: 0,
        };
        // forEach (exercises) - push a work interval + a break right after (using the above format)
        // assign breaks the id of the workout before in the following format: exerciseOrderIndex--break
        // at the end push a cooldown (same format)

        // set intervals

    }

    // MOVE to util
    const workoutPresets = {
        initial: [
            { orderIndex: '0', duration: '30', type: 'preparation' },
            { orderIndex: '1', duration: '45', type: 'work', exercise: 'Jumping Jacks' },
            { orderIndex: '2', duration: '15', type: 'rest' },
            { orderIndex: '100000', duration: '60', type: 'cooldown' },
        ],
        // to find and add 2-3 basic presets
    };

    // ONLY USE inside Create Workout Page
    function loadWorkoutPreset(preset) {
        // workoutPresets.initial
        const prep = preset[0]

        const lastIndex = preset[preset.length - 2].orderIndex;
        setNextAvailableID(lastIndex + 1);
        setIntervals(preset);
        setPrep((preset.find(x => x.type == 'preparation')).duration);
        setRest((preset.find(x => x.type == 'rest')).duration);
        setCooldown((preset.find(x => x.type == 'cooldown')).duration);
    }

    async function createWorkout(workout) {
        // skip break intervals when creating a new workout into the DB
        // filter the break intervals out and push the workout with only work intervals
    }

    async function updateWorkout(workoutID, workout) {
        // translate the intervals to workout object fit for the DB
    }

    async function deleteWorkout(workoutID) { }

    function createInterval(type = 'preparation', exercise = '', duration = '0') {
        let orderIndex;
        switch (type) {
            case ('preparation'): orderIndex = '0'; break;
            case ('cooldown'): orderIndex = '100000'; break;
            case ('work'): orderIndex = genID(); break;
        }

        let interval, restInterval;
        if (type != 'work') {
            interval = { type, duration, orderIndex };
            setIntervals([...intervals, interval]);
        } else {
            interval = { type, duration, exercise, orderIndex };
            restInterval = { type: 'rest', duration: rest, orderIndex: `${orderIndex}.5` };
            setIntervals([...intervals, interval, restInterval]);
        }
    }

    function updateInterval(orderIndex, exercise = '', duration = '0') {
        let properties = { duration };
        if (exercise != '') properties.exercise = exercise;
        const isMatch = (interval) => interval.orderIndex === orderIndex;

        setIntervals((prevIntervals) =>
            prevIntervals.map((interval) =>
                isMatch(interval) ? { ...interval, ...properties } : interval
            )
        );
    }

    function updateServiceInterval(type = 'preparation', duration = '0', workIntervalOrderIndex) {
        let orderIndex;
        if (workIntervalOrderIndex) orderIndex = workIntervalOrderIndex;

        switch (type) {
            case ('preparation'): orderIndex = '0'; break;
            case ('cooldown'): orderIndex = '100000'; break;
        }

        setIntervals((prevIntervals) =>
            prevIntervals.map((interval) =>
                interval.orderIndex === orderIndex
                    ? { ...interval, duration }
                    : interval
            )
        );
    }

    // ORDER IDs:
    // - when an interval is deleted - re-assign all order IDs again
    // - when an interval is reordered up - switch orderID of the upper el with the current


    // TODO: FIGURE OUT how to get edit or view page's current IDs, intervals and populating them to the context state
    // Pull the information from the database using the DB ID for the workout and use that to populate the
    // intervals / create a state for them here



    function resetStateFull() {
        setNextAvailableID(0);
        setIntervals([]);
        setWorkout(null);
        setCurrentLoadedID(null);
    }

    function genID() {
        const current = nextAvailableID;
        setNextAvailableID(current + 1);
        return current;
    }





    // ADD STATISTICS LOGGER FUNC / for history and recent history / total intervals, etc... figure it out
    // need to create back end models as well - figure it out

    const ContextData = {
        intervals,
        prep, setPrep,
        rest, setRest,
        cooldown, setCooldown,
        workoutName, setWorkoutName,

    };

    return (
        <WorkoutContext.Provider value={ContextData}>
            {children}
        </WorkoutContext.Provider>
    );
};