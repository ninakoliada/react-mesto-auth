import { useContext } from "react";
import { UserContext } from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete }) => {
    const currentUser = useContext(UserContext);

    function handleClick () {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }
    
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : ''}`
    ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__heart-button ${isLiked ? 'card__heart-button_active' : ''}`; 

    return (
        <div className="gallery__item card">
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="card__section">
                <h4 className="card__text">{card.name}</h4>
                <div className="card__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
                    <span className="card__likes-count">{card.likes.length}</span>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </div>
    )
}

export default Card;