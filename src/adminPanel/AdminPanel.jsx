import React, { useContext, useState } from "react";
import { StoreContext } from "../store/StoreProvider";
import CourseDetails from "./subComponents/CourseDetails";
import CoursePopup from "./subComponents/CoursePopup";
import Button from '@mui/material/Button';


const AdminPanel = () => {
    const { courses } = useContext(StoreContext);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = (e) => {
        e.preventDefault();
        setIsOpenPopup(false);
    };
    const coursesElements = courses.map(course => <CourseDetails key={course.id} {...course} />);
    return <section>
        {coursesElements}
        <Button onClick={showPopup} variant="contained">Dodaj nowy kurs</Button>
        <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} isEditMode={false} />
    </section>
}

export default AdminPanel;