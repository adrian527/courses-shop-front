import React, { useContext, useState } from "react";
import bemCssModules from 'bem-css-modules'
import Modal from '../../components/modal/Modal'
import { default as CoursePopupStyles } from './CoursePopup.module.scss';
import { StoreContext } from "../../store/StoreProvider";
import request from "../../helpers/request";
import Button from '@mui/material/Button';
const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({ authors = [], hidePopup, isEditMode = true, isOpenPopup, id, img = '', price = 0, title = "" }) => {
    const [formAuthors, setFormAuthors] = useState(authors);
    const [formAuthor, setFormAuthor] = useState('');
    const [formImg, setFormImg] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);

    const { setCourses } = useContext(StoreContext);

    const handleOnChangeAuthor = e => setFormAuthor(e.target.value)
    const handleOnChangeImg = e => setFormImg(e.target.value)
    const handleOnChangePrice = e => setFormPrice(e.target.value)
    const handleOnChangeTitle = e => setFormTitle(e.target.value)

    const handleOnSubmit = async e => {
        e.preventDefault();

        const courseObject = {
            authors: formAuthors,
            id,
            img: formImg,
            price: Number(formPrice),
            title: formTitle
        };

        if (isEditMode) {
            const { data, status } = await request.put('/courses', courseObject);

            if (status === 202) {
                setCourses(data.courses);
            }
        } else {
            const { data, status } = await request.post('/courses', courseObject);

            if (status === 201) {
                setCourses(data.courses);
            }
        }

        hidePopup(e);
    }

    const addAuthor = e => {
        e.preventDefault();
        setFormAuthors(prev => [...prev, formAuthor]);
        setFormAuthor('');
    }

    const deleteAuthor = (e) => {
        const authorToDelete = e.target.dataset.author;
        setFormAuthors(prev => prev.filter(author => author !== authorToDelete));
    }

    const authorsElements = formAuthors.map(author => <li key={author}>
        <p>{author}</p>
        <Button data-author={author} onClick={deleteAuthor}>Usuń autora</Button>
    </li>)

    const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utwórz kurs'

    return (
        <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
            <div className={style()}>
                <form className={style('form')} method="submit" onSubmit={handleOnSubmit}>
                    <div className={style('form-row')}>
                        <label>
                            Autor:
                            <input className={style('input')} type="text" value={formAuthor} onChange={handleOnChangeAuthor} />
                            <Button onClick={addAuthor}>Dodaj autora</Button>
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Obraek url:
                            <input className={style('input')} type="text" value={formImg} onChange={handleOnChangeImg} />
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Cena:
                            <input className={style('input')} type="number" value={formPrice} onChange={handleOnChangePrice} />
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Tytuł:
                            <input className={style('input')} type="text" value={formTitle} onChange={handleOnChangeTitle} />
                        </label>
                    </div>
                    {formAuthors.length && <Button type="submit">{correctLabel}</Button>}
                    <Button type="button" onClick={hidePopup}>Anuluj</Button>
                </form>
                <p>Lista autorów:</p>
                <ul style={{ listStyle: 'none' }}>
                    {authorsElements}
                </ul>
            </div>
        </Modal>
    );
}

export default CoursePopup;