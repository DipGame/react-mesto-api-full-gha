export default function ImagePopup(props) {
    return (
        <div className={`overlay overlay_img ${props.card.link ? 'overlay_open' : ''}`}>
            <form className="img-form" name="imgForm">
                <button onClick={props.onClose} className="img-form__close-button overlay__close" type="button" />
                <img
                    className="img-form__picture"
                    alt="Здесь должна была быть картинка"
                    src={props.card ? props.card.link : ''}
                />
                <h2 className="img-form__title">{props.card.name}</h2>
            </form>
        </div>
    );
}