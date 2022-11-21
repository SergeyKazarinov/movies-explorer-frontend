import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";

const Profile = () => {
  const currentUser = useContext(CurrentUserContext);

  return(
    <>
      <Header loggedIn={true}/>
      <main>
        <section className="profile">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <div className="profile__container">
            <div className="profile__flex">
              <p className="profile__text">Имя</p>
              <p className="profile__data">{currentUser.name}</p>
            </div>
            <div className="profile__line"></div>
            <div className="profile__flex">
              <p className="profile__text">E-mail</p>
              <p className="profile__data">{currentUser.email}</p>
            </div>
          </div>
          <button type="button" className="button profile__edit">Редактировать</button>
          <button type="button" className="button profile__exit">Выйти из аккаунта</button>
        </section>
      </main>
    </>
  )
}

export default Profile;