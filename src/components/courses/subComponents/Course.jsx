import React, { useContext } from "react";
import bemCssModules from 'bem-css-modules';
import { default as CourseStyles } from './Course.module.scss';
import request from "../../../helpers/request";
import { StoreContext } from "../../../store/StoreProvider";
import { useNavigate } from "react-router-dom";
const style = bemCssModules(CourseStyles);
import Button from '@mui/material/Button';

const Course = ({ authors, img, price, title, isUserContext, id }) => {
    const { user, setUser } = useContext(StoreContext);
    const allAuthors = authors.join(', ');
    const isUserLogged = !!user;
    const navigate = useNavigate();

    const handleOnClick = async () => {
        try {
            const { data, status } = await request.patch('/users', {
                login: user.login,
                courseId: id,
            });

            if (status === 202) {
                setUser(data.user);
                navigate('/my-courses');
            }
        } catch (e) {
            console.warn(e);
        }
    }
    const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;
    return <li><article className={style()}>
        <h3 className={style('title')}>{title}</h3>
        <img src={img} alt={title} className={style('image')} />
        <p className={style('price')}>{`Koszt kursu: ${price}`}</p>
        <p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && <Button sx={{ marginTop: '1rem', color: "black", fontWeight: 'bold' }} onClick={handleOnClick}>Zakup ten kurs</Button>}
    </article></li>
}

export default Course;