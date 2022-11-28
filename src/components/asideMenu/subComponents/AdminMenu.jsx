import React from "react";
import bemCssModules from 'bem-css-modules';

import { default as AsideMenuStyles } from '../AsideMenu.module.scss';
import { NavLink } from "react-router-dom";
import Typography from '@mui/material/Typography';

const style = bemCssModules(AsideMenuStyles);

const AdminMenu = () => (
    <>
        <Typography mt={2}>Panel Administratora</Typography>
        <nav>
            <ul>
                <li className={style('link')}>
                    <NavLink to="/manage-courses">
                        Zarządzanie kursami
                    </NavLink>
                </li>
            </ul>
        </nav>
    </>
)

export default AdminMenu;