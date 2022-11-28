import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null);
    const fetchData = async () => {
        try {
            const { data } = await request.get('/courses');

            setCourses(data.courses);
        } catch (e) {
            console.log('Server Error')
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    return <StoreContext.Provider value={{ courses, setCourses, user, setUser }}>{children}</StoreContext.Provider>
};

export default StoreProvider;