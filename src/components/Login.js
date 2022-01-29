import Input from "./Input";
import Button from "./Button";
import * as auth from '../auth';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

import '../styles/Login.css';

const Login = ({ onLoggedIn, onError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function onChangeHandler (e) {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }
    
    function onSubmitHandler (e) {
        e.preventDefault();

        auth.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    setEmail('');
                    setPassword('');
                    
                    onLoggedIn();
                    history.push('/');
                }
            })
            .catch((err) => {
                onError();
                console.log(err);
            })
    }

    return (
        <form className="login" onSubmit={onSubmitHandler}>
            <h2 className="login__title">Вход</h2>
            <Input value={email} onChange={onChangeHandler} name="email" type="email" className="register__input" theme="dark" placeholder="Email" />
            <Input value={password} onChange={onChangeHandler} name="password" type="password" className="register__input" theme="dark" placeholder="Пароль" />
            <Button type="submit" theme="white" size="l" className="login__button">Войти</Button>
        </form>
    )
}

export default Login;