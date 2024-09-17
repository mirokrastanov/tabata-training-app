import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import * as page from '../utils/pageParamLibrary.js';

/**
 * @typedef PageContextData
 * @property {null | Object} location
 * @property {null | Object} pageParams
 * @property {function} updatePageParams
 */



const PageContext = createContext();

/**
 * @returns {PageContextData}
 */
export function usePage() {
    return useContext(PageContext);
}

export function PageProvider({ children }) {
    const [pageParams, setPageParams] = useState(page.defaultCase);
    const location = useLocation();

    useEffect(() => {
        // console.log('Current pathname:', location.pathname);
        updatePageParams();
    }, [location]);

    // useEffect(() => {
    //     console.log(pageParams);
    // }, [pageParams]);

    const updatePageParams = () => {
        // Set params based on current location
        const url = location.pathname;
        Object.values(page).forEach(v => {
            if (
                (url.includes('edit') && v.path.includes('edit')) ||
                (url.includes('details') && v.path.includes('details')) ||
                url === v.path
            ) {
                setPageParams(v);

            }
        });

    };

    const ContextData = { location, pageParams, updatePageParams };

    return (
        <PageContext.Provider value={ContextData}>
            {children}
        </PageContext.Provider>
    );
};