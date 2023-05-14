import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export default function EditAvatarPopup(props) {

    const refInput = React.useRef('');

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateAvatar({
            avatar: refInput.current.value,
        });

    }

    useEffect(() => {
        refInput.current.value = ''
    }, [props.isOpen]);

    return (
        <PopupWithForm buttonText='Сохранить' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='avatar' text='Обновить аватар'>
            <input
                id="avatarUrl"
                ref={refInput}
                className="popup__input avatar__input"
                type="url"
                name="avatarUrl"
                placeholder="Ссылка на картинку"
                required=""
            />
            <span
                className="popup__input-error avatarUrl-error"
                id="errorAvatarUrl"
            />
        </PopupWithForm>
    );
}