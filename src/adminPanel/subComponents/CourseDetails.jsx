import React, { useContext, useState } from "react";
import request from "../../helpers/request";
import { StoreContext } from '../../store/StoreProvider'
import CoursePopup from "./CoursePopup";
import Button from '@mui/material/Button';

const CourseDetails = (props) => {
    const { id, title } = props;
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { setCourses } = useContext(StoreContext);
    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = e => {
        e.preventDefault();
        setIsOpenPopup(false);
    };

    const handleDeleteCourse = async () => {
        try {
            const { status } = await request.delete(`/courses/${id}`);

            if (status === 200) {
                setCourses(prev => prev.filter(course => course.id !== id));
            }
        } catch (e) {
            console.warn(e);
        }
    }

    return (
        <details style={{ marginBottom: '1rem' }}>
            <summary>{title}</summary>
            <Button onClick={showPopup}>Edytuj</Button>
            <Button onClick={handleDeleteCourse}>Usuń</Button>
            <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props} />
        </details>
    )
}

export default CourseDetails;