import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import * as page from '../utils/pageParamLibrary.js';

const PageContext = createContext();

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
        Object.values(page).forEach(v => {
            if (v.path === location.pathname) setPageParams(v);
        });

    };

    const ContextData = { location, pageParams, updatePageParams };

    return (
        <PageContext.Provider value={ContextData}>
            {children}
        </PageContext.Provider>
    );
};