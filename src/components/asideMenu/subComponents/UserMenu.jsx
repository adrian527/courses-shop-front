import React from "react";
import bemCssModules from 'bem-css-modules';

import { default as AsideMenuStyles } from '../AsideMenu.module.scss';
import { NavLink } from "react-router-dom";
import Typography from '@mui/material/Typography';

const style = bemCssModules(AsideMenuStyles);

const UserMenu = ({ isUserLogged }) => (
    <>
        <Typography>Panel Użytkownika</Typography>
        <nav>
            <ul>
                <li className={style('link')}>
                    <NavLink to="/">
                        Kursy w sprzedaży
                    </NavLink>
                </li>
                {isUserLogged && <li className={style('link')}><NavLink to="/my-courses">Moje zakupione kursy</NavLink></li>}
            </ul>
        </nav>
    </>
)

export default UserMenu;