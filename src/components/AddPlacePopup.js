import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
      setName('');
      setLink('');
  }, [isOpen]);

    function onChange(event) {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'link') {
            setLink(event.target.value);
        }
    }

    function onSubmitHandler(event) {
        event.preventDefault();

        onAddPlace({ name, link });
    }

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={onSubmitHandler} title="Новое место" name="place" buttonText="Создать">
          <label className="popup__form-field">
            <input value={name} onChange={onChange} id="place-name" name="name" className="popup__input popup__input_type_name" type="text" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__error place-name-error"></span>
          </label>
          <label className="popup__form-field">
            <input value={link} onChange={onChange} id="place-link" name="link" className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup__error place-link-error"></span>
          </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;