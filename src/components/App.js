import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { UserContext } from '../contexts/CurrentUserContext';

import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true)
  }

  function onAddPlace() {
    setIsPlacePopupOpen(true)
  }
  
  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true)
  }
  function onCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then((newUserData) => {
        closeAllPopups();
        setCurrentUser(newUserData);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error)
      })
}

  function handleCardDelete(card) {
      api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="page__content">
      <UserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={onEditProfile}
          onAddPlace={onAddPlace}
          onEditAvatar={onEditAvatar}
          onCardClick={onCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
