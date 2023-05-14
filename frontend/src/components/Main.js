import logoPen from '../images/Vector.png';
import { api } from '../utils/Api.js';
import { useState, useEffect } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export default function Main(props) {

  const cards = props.cards;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <img
            className="profile__avatar-pen"
            src={logoPen}
            alt="Ручка"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <h2 className="profile__profession">{currentUser.about}</h2>
        </div>
        <button className="profile__edit-button" type="button" onClick={props.onEditProfile} />
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {
          cards.map((item) => {
            return (<Card onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} onCardLike={props.onCardLike} card={item} key={item._id} name={item.name} link={item.link} likes={item.likes.length} />)
          })
        }
      </section>
    </main>
  );
}