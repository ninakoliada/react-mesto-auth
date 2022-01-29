const PopupWithForm = ({ name, title, isOpen, onClose, children, onSubmit, buttonText }) => {
    const className = `popup ${isOpen ? 'popup_visibility_visible' : ''}`;

    return (
        <div className={className}>
            <div className="popup__background" onClick={onClose}></div>
            <div className="popup__body">
                <h3 className="popup__text">{title}</h3>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="button button_size_l popup__button">{buttonText}</button>
                </form>
                <button type="button" className="button popup__close" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;