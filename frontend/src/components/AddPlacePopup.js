import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export default function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdatePlace({
      name,
      link
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangelink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm buttonText='Создать' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='place' text='Новое место'>
      <input
        onChange={handleChangeName}
        value={name}
        id="placeName"
        className="popup__input popup__input_one place__input"
        type="text"
        name="placeName"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
      />
      <span
        className="popup__input-error placeName-error"
        id="errorPlaceName"
      />
      <input
        onChange={handleChangelink}
        value={link}
        id="placeUrl"
        className="popup__input popup__input_two place__input"
        type="url"
        name="placeUrl"
        placeholder="Ссылка на картинку"
        required=""
      />
      <span
        className="popup__input-error placeUrl-error"
        id="errorPlaceUrl"
      />
    </PopupWithForm>
  );
}