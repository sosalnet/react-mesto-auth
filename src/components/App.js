import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopup() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({})
    }

    function handleUpdateAvatar(e) {
        api.addNewAvatar(e)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopup();
            })
            .catch((res) => {
                console.log(res);
            })
    }

    function handleUpdateUser(e) {
        api.setUserInfo(e.name, e.about)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopup();
            })
            .catch((res) => {
                console.log(res);
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((res) => {
                console.log(res);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((res) => {
                console.log(res);
            })
    }

    function handleAddPlaceSubmit(name, link) {
        api.addNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopup();
            })
            .catch((res) => {
                console.log(res);
            })
    }

    useEffect(() => {
        api.getCards()
            .then((res) => {
                setCards(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        api.getUserInfo()
            .then((e) => {
                setCurrentUser(e);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="app">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete} />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} onUpdateAvatar={handleUpdateAvatar} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopup} onAddPlace={handleAddPlaceSubmit} />

                <ImagePopup card={selectedCard} onClose={closeAllPopup} />

                <PopupWithForm name='delete' title='Вы уверены?' textButton='Да' />


            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
