export const dddd = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Сургут',
        link: 'https://picworld.ru/wp-content/uploads/2017/02/Surgut_05.jpeg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const profileOverlayEl = document.querySelector('.overlay_popup');
export const placeprofileOverlayEl = document.querySelector('.overlay_place');
export const imgprofileOverlayEl = document.querySelector('.overlay_img');
export const profileForm = profileOverlayEl.querySelector('.profileForm')
export const avatarName = profileOverlayEl.querySelector('input[name="name"]');
export const avatarProf = profileOverlayEl.querySelector('input[name="profession"]');
export const avatarOpenButton = document.querySelector('.profile__edit-button');
export const popupSaveButton = profileOverlayEl.querySelector('.popup__save-button');
export const profile = document.querySelector('.profile');
export const avatarButton = profile.querySelector('.profile__avatar')
export const profileName = profile.querySelector(".profile__name");
export const profileProf = profile.querySelector(".profile__profession");

export const elementLike = document.querySelector(".element__number");

export const elementsTemplate = document.querySelector('.elements');
export const formSelector = "#placeCardTemplate";
export const placeForm = placeprofileOverlayEl.querySelector('.place');
export const placeName = placeprofileOverlayEl.querySelector('input[name="placeName"]');
export const placeUrl = placeprofileOverlayEl.querySelector('input[name="placeUrl"]');
export const placeOpenButton = document.querySelector('.profile__add-button');
export const placeSaveButton = placeprofileOverlayEl.querySelector('.place__add-button');


export const imgName = imgprofileOverlayEl.querySelector('.img-form__title');
export const imgPicture = imgprofileOverlayEl.querySelector('.img-form__picture');

export const askOverlay = document.querySelector('.overlay_ask');
export const askForm = askOverlay.querySelector('.popup');
export const askYesButton = askOverlay.querySelector('.popup__save-button');

export const avatarOverlay = document.querySelector('.overlay_avatar');
export const avatarUrl = avatarOverlay.querySelector('input[name="avatarUrl"]');
export const avatarForm = avatarOverlay.querySelector('.avatar');
export const avatarButtonForm = avatarOverlay.querySelector('.popup__save-button');

export const configApi = {
    url: "https://mesto.nomoreparties.co",
    headers: {
      authorization: '857bdf83-dc02-40c2-8f07-47f065018f5b',
      'Content-Type': 'application/json'
    },
  }

  export const enableValidation = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'popup__input-error_active'
  };