import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export default function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const card = props.card;
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );;

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <div className="element">
      {isOwn && <button onClick={handleDeleteClick} className="element__delete button" type="button" />}
      <img onClick={handleClick} className="element__image" alt={props.name} type="button" src={props.link} />
      <div className="element__container-bottom">
        <h2 className="element__title">{props.name}</h2>
        <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" />
        <h3 className="element__number">{props.likes}</h3>
      </div>
    </div>
  );
}