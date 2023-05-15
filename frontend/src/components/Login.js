import React, { useState } from 'react';
import * as RegisterAuth from '../utils/RegisterAuth.js';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/Vector.svg';
import Header from './Header.js';


export default function Login({ handleLogin, ...props }) {

  const BASE_URL = 'https://auth.nomoreparties.co';

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
    console.log('hiSudb');
    RegisterAuth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          props.good();
          props.onSelectMail(formValue.email);
          setFormValue({ email: '', password: '' });
          navigate('/', { replace: true });
          localStorage.setItem('jwt', data.token);
          handleLogin();
          return data;
        }
      })
      .catch((err) => {
        props.noGood();
        console.log(err)
      })
  }

  return (
    <>
    <Header link={'Регистрация'} sign={'/sign-up'} />
    
      <div className="sign">
        <h2 className="sign__title">Вход</h2>
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
        <button type="submit" className="sign__button">Вход</button>
        </form>
      </div>
    </>
  );
}