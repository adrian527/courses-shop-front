import React, { useContext, useEffect, useState } from "react";
import bemCssModules from 'bem-css-modules';
import { default as LoginFormStyles } from './LoginForm.module.scss';
import Modal from "../modal/Modal";
import { StoreContext } from '../../store/StoreProvider'
import request from "../../helpers/request";

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState("");

    const { setUser } = useContext(StoreContext);
    const handleOnChangeLogin = e => setLogin(e.target.value);
    const handleOnChangePassword = e => setPassword(e.target.value);
    const handleOnCloseModal = e => {
        e.preventDefault();
        handleOnClose();
    }
    const resetStateOfInput = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    };
    const validateMessageComponent = validateMessage.length ? <p>{validateMessage}</p> : null;

    const handleOnSubmit = async e => {
        e.preventDefault();
        const { data, status } = await request.post('/users', { login, password });

        if (status === 200) {
            setUser(data.user);
            resetStateOfInput();
            handleOnClose();
        } else {
            setValidateMessage(data.message);
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            resetStateOfInput();
        }
    }, [isModalOpen]);

    return (
        <Modal isOpen={isModalOpen} handleOnClose={handleOnClose} shouldBeCloseOnOutsiedClick>
            {validateMessageComponent}
            <form className={style()} method="post" onSubmit={handleOnSubmit}>
                <div className={style('row')}>
                    <label>
                        Login:
                        <input type="text" value={login} onChange={handleOnChangeLogin} />
                    </label>
                </div>
                <div className={style('row')}>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handleOnChangePassword} />
                    </label>
                </div>
                <div className={style('row')}>
                    <button type="submit">Zaloguj</button>
                    <button type="button" onClick={handleOnCloseModal}>Anuluj</button>
                </div>
            </form>
        </Modal>
    )
}

export default LoginForm;