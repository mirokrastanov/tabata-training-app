import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

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
    // STATES
    const [nextAvailableID, setNextAvailableID] = useState(0);
    const [intervals, setIntervals] = useState([]);
    // ORDER IDs as well - to be updated:
    // - when an interval is deleted - re-assign all order IDs again
    // - when an interval is reordered up - switch orderID of the upper el with the current
    // FIGURE OUT either to keep an order ID in a state here or there is a better way to do this

    const sampleWorkout = {
        creatorId: 'creatorId',
        preparation: 30,
        break: 15,
        cooldown: 60,
        exercises: [
            { exercise: 'Jumping Jacks', duration: 45, orderIndex: 1 },
        ],
    };


    // WHEN CHANGING location track and reset state, depending on create,edit, etc...
    // when changing location, maybe always clear state, or do a check and clear if not already cleared to save
    // resources... SO FIGURE OUT a good/checkable initial state for all params



    // useEffect(() => {

    // }, []);



    const ContextData = {

    };

    return (
        <WorkoutContext.Provider value={ContextData}>
            {children}
        </WorkoutContext.Provider>
    );
};