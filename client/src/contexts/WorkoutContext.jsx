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
    const location = useLocation();
    // STATES
    const [currentPage, setCurrentPage] = useState('');
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


    const checkAndUpdatePage = () => {
        if (location.pathname === '/workouts/create') setCurrentPage('create');
        else if (location.pathname.includes('/workouts/edit')) setCurrentPage('edit');
        else if (location.pathname.includes('/workouts/details')) setCurrentPage('view');
    }

    // TODO: Create an order ID assignment for workout views (create, edit, view/details)




    // ADD STATISTICS LOGGER FUNC / for history and recent history / total intervals, etc... figure it out
    // need to create back end models as well - figure it out
    


    // useEffect(() => {

    // }, []);

    useEffect(() => {
        checkAndUpdatePage();
    }, [location]);

    useEffect(() => {
        setNextAvailableID(0);
        setIntervals([]);
    }, [currentPage]);



    const ContextData = {

    };

    return (
        <WorkoutContext.Provider value={ContextData}>
            {children}
        </WorkoutContext.Provider>
    );
};