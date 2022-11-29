import React, { useContext } from "react";
import bemCssModules from 'bem-css-modules';

import { default as ContentStyles } from './Content.module.scss';
import { Route, Routes, Navigate } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import Courses from '../courses/Courses'
import UserCourses from "../userCourses/UserCourses";
import AdminPanel from "../../adminPanel/AdminPanel";

const style = bemCssModules(ContentStyles);
const ADMIN_TYPE = 1;

const Content = () => {
    const { user } = useContext(StoreContext);
    const isUserLogged = !!user;
    const isAdmin = user?.accessLevel === ADMIN_TYPE;

    return <main className={style()}>
        <Routes>
            <Route path="/" element={<Courses />} />
            {isUserLogged && <Route path="/my-courses" element={<UserCourses />} />
            }
            {isAdmin && <Route path="/manage-courses" element={<AdminPanel />} />
            }
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </main>
}

export default Content;