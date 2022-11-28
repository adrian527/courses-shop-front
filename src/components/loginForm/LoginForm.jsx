import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { StoreContext } from '../../store/StoreProvider'
import request from "../../helpers/request";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    const validateMessageComponent = validateMessage.length ? validateMessage : null;

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
            <form method="post" onSubmit={handleOnSubmit}>
                <Box sx={{ padding: '1rem' }}>
                    <Typography mb={2} sx={{ width: '15rem' }}>
                        {validateMessageComponent}
                    </Typography>
                    <Box mb={2}>
                        <TextField id="standard-basic" label="Login" variant="outlined" value={login} onChange={handleOnChangeLogin} />
                    </Box>
                    <Box mb={3}>
                        <TextField type="password" id="standard-basic" label="Password" variant="outlined" value={password} onChange={handleOnChangePassword} />
                    </Box>
                    <Box>
                        <Button type="submit">Zaloguj</Button>
                        <Button type="button" onClick={handleOnCloseModal}>Anuluj</Button>
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}

export default LoginForm;