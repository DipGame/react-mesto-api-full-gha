import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export default function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm buttonText='Сохранить' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='popup' text='Редактировать профиль'>
            <input
                onChange={handleChangeName}
                id="popupUserName"
                value={name}
                className="popup__input popup__input_one"
                type="text"
                name="name"
                placeholder="Ваше имя"
                required=""
                minLength={2}
                maxLength={40}
            />
            <span
                className="popup__input-error popupUserName-error"
                id="errorUserName"
            />
            <input
                onChange={handleChangeDescription}
                id="popupProfName"
                value={description}
                className="popup__input popup__input_two"
                type="text"
                name="profession"
                placeholder="Ваша профессия"
                required=""
                minLength={2}
                maxLength={200}
            />
            <span
                className="popup__input-error popupProfName-error"
                id="errorProfName"
            />
        </PopupWithForm>
    );
}

