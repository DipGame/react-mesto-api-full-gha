import logo from '../images/Vector.svg';
import close from '../images/Close_Icon.svg';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(props) {

  const top = document.querySelector('.top');
  const topLogin = document.querySelector('.top__login');
  const topEsc = document.querySelector('.top__esc');
  const headerClose = document.querySelector('.header__close');
  const headerThree = document.querySelector('.header__three');

  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
  }

  function openThree() {
    headerThree.classList.remove('overlay_open');
    headerThree.setAttribute("style", "width: 0px");
    headerClose.setAttribute("style", "width: 24px");
    headerClose.classList.add('overlay_open')
    top.setAttribute("style", "height: 142px");

    top.classList.add('overlay_open');
    topLogin.classList.add('overlay_open');
    topEsc.classList.add('overlay_open');
  }

  function closeThree() {
    headerThree.classList.add('overlay_open');
    headerClose.setAttribute("style", "width: 0px");
    headerClose.classList.remove('overlay_open')
    headerThree.setAttribute("style", "width: 24px");
    top.setAttribute("style", "height: 0");

    top.classList.remove('overlay_open');
    topLogin.classList.remove('overlay_open');
    topEsc.classList.remove('overlay_open');
  }

  return (
    <>
      <div className='top' >
        <p className='top__login'>{props.login}</p>
        <p className='top__esc' onClick={signOut}>Выйти</p>
      </div>
      <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Россия"
        />
        <div className='header__reg header__container'>
          <img className='header__three overlay_open' onClick={openThree} src={props.threeLine} ></img>
          <img className='header__close' onClick={closeThree} src={close}></img>
          <button onClick={signOut} className='header__esc' >{props.button}</button>
          <h2 className='header__reg header__login'>{props.login}</h2>
          {props.sign && <Link to={props.sign} className='header__reg'>{props.link}</Link>}
        </div>
      </header>
    </>
  );
}