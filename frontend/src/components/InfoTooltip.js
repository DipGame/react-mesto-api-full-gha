export default function InfoTooltip(props) {
    return (
        <div className={`overlay overlay_avatar overlay_success ${props.isOpen && 'overlay_open'}`}>
            <div className='popup popup_form success' name="popupForm">
                <fieldset className="popup__set">
                    <img className="success__lable" src={props.lable}></img>
                    <p className="success__title">{props.title}</p>
                </fieldset>
            </div>
        </div>
    );
}