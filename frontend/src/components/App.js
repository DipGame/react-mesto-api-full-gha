import { useState, useEffect } from 'react';
import React from 'react';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import * as RegisterAuth from '../utils/RegisterAuth.js';
import Api from '../utils/Api.js';
import Login from './Login.js';
import Register from './Register.js';
import Main from './Main.js';
import Header from './Header.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import GoodSuccess from './GoodSuccess.js';
import NoGoodSuccess from './NoGoodSuccess.js';
import threeLine from '../images/3line.png';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isGoodSuccesPopupOpen, setIsGoodSuccesPopupOpen] = useState(false);
  const [isNoGoodSuccesPopupOpen, setIsNoGoodSuccesPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedToken, setSelectedToken] = useState('');
  const [currentUser, setCurrentUser] = React.useState({
    avatar: '',
    name: '',
    about: '',
  });

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [emailLogin, setEmailLogin] = useState('');

  useEffect(() => {
    handleTokenCheck();
  }, [])

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      RegisterAuth.checkToken(jwt).then((res) => {
        console.log(res.email);
        setEmailLogin(res.email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleSetEmail(mail) {
    setEmailLogin(mail);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  function openGoodSuccess() {
    setIsGoodSuccesPopupOpen(true);
    setTimeout(closeGoodSuccess, 1000);
  }

  function closeGoodSuccess() {
    setIsGoodSuccesPopupOpen(false);
  }

  function openNoGoodSuccess() {
    setIsNoGoodSuccesPopupOpen(true);
    setTimeout(closeNoGoodSuccess, 1000);
  }

  function closeNoGoodSuccess() {
    setIsNoGoodSuccesPopupOpen(false);
  }

  useEffect(() => {
    const configApi = {
      url: "http://api.ivachev.k.f.students.nomoredomains.monster",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }

    const api = new Api(configApi);
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))
  }, [loggedIn]);

  useEffect(() => {
    setSelectedToken(localStorage.getItem('jwt'));
    const configApi = {
      url: "http://api.ivachev.k.f.students.nomoredomains.monster",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }

    const api = new Api(configApi);
    api.getAllCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => console.log(err))
  }, [loggedIn])

  function handleCardLike(card) {
    setSelectedToken(localStorage.getItem('jwt'));
    const configApi = {
      url: "http://api.ivachev.k.f.students.nomoredomains.monster",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }

    const api = new Api(configApi);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    console.log(isLiked);
    api.changeLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        console.log(newCard);
        console.log('hi api');
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    setSelectedToken(localStorage.getItem('jwt'));
    const configApi = {
      url: "http://api.ivachev.k.f.students.nomoredomains.monster",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }

    const api = new Api(configApi);
    api.setUserInfo({
      name: name,
      about: about,
    })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    setSelectedToken(localStorage.getItem('jwt'));
    const configApi = {
      url: "http://api.ivachev.k.f.students.nomoredomains.monster",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }

    const api = new Api(configApi);
    api.deleteCards(card._id)
      .then((data) => {
        setCards(prevState => prevState.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    console.log(avatar);
    setSelectedToken(localStorage.getItem('jwt'));
    const configApi = {
      url: "http://api.ivachev.k.f.students.nomoredomains.monster",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }

    const api = new Api(configApi);
    api.createNewAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setSelectedToken(localStorage.getItem('jwt'));
    const configApi = {
      url: "http://api.ivachev.k.f.students.nomoredomains.monster",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }

    const api = new Api(configApi);
    api.createNewCard({
      name: name,
      link: link
    })
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header login={emailLogin} button={'Выйти'} threeLine={threeLine} />
                  <ProtectedRoute loggedIn={loggedIn}>

                    <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleEditPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete} cards={cards} />

                  </ProtectedRoute>
                  <Footer />
                </>
              } />
            <Route path='/sign-in' element={<Login handleLogin={handleLogin} onSelectMail={handleSetEmail} good={openGoodSuccess} noGood={openNoGoodSuccess} />} />
            <Route path='/sign-up' element={<Register good={openGoodSuccess} noGood={openNoGoodSuccess} />} />
          </Routes>
        </div>

        <GoodSuccess isOpen={isGoodSuccesPopupOpen} />

        <NoGoodSuccess isOpen={isNoGoodSuccesPopupOpen} />

        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

        <AddPlacePopup onUpdatePlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;