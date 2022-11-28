import React, { useContext, useState } from "react";
import bemCssModules from 'bem-css-modules'
import { StoreContext } from "../../store/StoreProvider";
import { default as HeaderStyles } from './Header.module.scss'
import LoginForm from "../loginForm/LoginForm";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = bemCssModules(HeaderStyles);

const Header = () => {
    const { user, setUser } = useContext(StoreContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnClose = () => setIsModalOpen(false)
    const handleOnClick = () => {
        if (!!user) {
            setUser(null);
        } else {
            setIsModalOpen(true);
        }
    }
    const setProperlyLabel = !!user ? "Wyloguj się" : "Zaloguj się"

    return (
        <header className={style()}>
            <div className={style('logo-wrapper')} />
            <Typography className={style('title')} variant="h4" component="h1" sx={{ marginLeft: '2rem' }}>
                Kursy dla programistów
            </Typography>
            <Button sx={{ marginRight: '1rem' }} onClick={handleOnClick}>{setProperlyLabel}</Button>
            <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
        </header>
    )
}

export default Header;