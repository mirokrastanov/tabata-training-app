import { createContext, useState, useEffect, useContext } from "react";
import { usePage } from "./PageContext";
import { getWorkoutIdFromQuery } from "../utils/queryParamMethods";

// /**
//  * @typedef WorkoutContextData
//  * @property {null | Object} location
//  * @property {null | Object} pageParams
//  * @property {function} updatePageParams
//  */



const WorkoutContext = createContext();

// /**
//  * @returns {WorkoutContextData}
//  */
export function useWorkout() {
    return useContext(WorkoutContext);
}

export function WorkoutProvider({ children }) {
    const [nextAvailableID, setNextAvailableID] = useState(0);
    const [intervals, setIntervals] = useState([]);
    const [workout, setWorkout] = useState(null);
    const [currentLoadedID, setCurrentLoadedID] = useState(null);

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
            intervalName: '',
            orderIndex: 0,
        };
        // forEach (exercises) - push a work interval + a break right after (using the above format)
        // assign breaks the id of the workout before in the following format: exerciseOrderIndex--break
        // at the end push a cooldown (same format)

        // set intervals

    }

    async function createWorkout(workout) {
        // skip break intervals when creating a new workout into the DB
        // filter the break intervals out and push the workout with only work intervals
    }

    async function updateWorkout(workoutID, workout) {
        // translate the intervals to workout object fit for the DB
    }

    async function deleteWorkout(workoutID) { }

    function createInterval(description = '', duration = '0') {
        // genID
        const sampleCreatedInterval = {
            type: 'work',
            duration,
            intervalName: description,
            orderIndex: 0, // genID()
        };

        const sampleBreakInterval = {
            type: 'break',
            duration: 15, // figure this one out | one consolidated value - get and apply for all | state (can be updated)
            intervalName: '',
            orderIndex: 0, // `${genID()}--break`
        }

        // push to intervals
        setIntervals([...intervals, sampleCreatedInterval, sampleBreakInterval]);
    }

    function updateInterval(orderIndex, description = '', duration = '0') {
        setIntervals((prevIntervals) =>
            prevIntervals.map((interval) =>
                interval.orderIndex === orderIndex
                    ? { ...interval, intervalName: description, duration }
                    : interval
            )
        );
        // TO TEST and confirm if another post-update sort is necessary
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

    };

    return (
        <WorkoutContext.Provider value={ContextData}>
            {children}
        </WorkoutContext.Provider>
    );
};