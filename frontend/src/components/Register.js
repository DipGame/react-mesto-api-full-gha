import * as RegisterAuth from '../utils/RegisterAuth.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/Vector.svg';
import Header from './Header.js';

export default function Register(props) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('hiSub');
        RegisterAuth.register(formValue.email, formValue.password)
            .then((data) => {
                props.good();
                console.log(data);
                navigate('/sign-in', { replace: true });
            })
            .catch((err) => {
                console.log(err)
                props.noGood();
            })
    }

    return (
        <>
            <Header link={'Войти'} sign={'/sign-in'} />
            <div className="sign">
                <h2 className="sign__title">Регистрация</h2>
                <form className='sign__form' onSubmit={handleSubmit}>
                    <input
                        className="sign__mail"
                        id="signRegMail"
                        value={formValue.email}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required=""
                        onChange={handleChange}>
                    </input>
                    <input
                        className="sign__pass"
                        id="signRegPass"
                        value={formValue.password}
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required=""
                        onChange={handleChange}>
                    </input>
                    <button type="submit" className="sign__button">Зарегистрироваться</button>
                </form>
                <h3 className='sign__answer'>Уже зарегистрированы? <Link className='sign__link' to='/sign-in' >Войти</Link></h3>
            </div>
        </>
    );
}