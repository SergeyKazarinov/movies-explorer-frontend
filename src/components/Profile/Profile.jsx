import { memo, useCallback, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Header from "../Header/Header";
import "./Profile.css";

const Profile = ({onSignOut, onUpdateUser, errorMessageApi, isLoader}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const isButtonActive = (isValid && (currentUser.name !== values.name || currentUser.email !== values.email));

  useEffect(() => {
    resetForm(currentUser);
  }, [resetForm, currentUser])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      email: values.email
    });
  }, [values]);
  
  return(
    <>
      <Header loggedIn={true}/>
      <main>
        <section className="profile">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <div className="profile__container">
            <form className="form profile__form" name="profileEdit" onSubmit={handleSubmit} noValidate>
              <fieldset className="profile__flex">
                <label htmlFor="name" className="profile__text">Имя</label>
                <input 
                  className="profile__input"
                  type="text" id="name"
                  name="name"
                  value={values.name || currentUser.name}
                  minLength="4"
                  maxLength="40"
                  onChange={handleChange}
                  required
                />
                <span className={`form__inputError ${!!errors.name && 'form__inputError_active'}`}>{errors.name}</span>
              </fieldset>
              <div className="profile__line"></div>
              <fieldset className="profile__flex">
                <label htmlFor="email" className="profile__text">E-mail</label>
                <input
                  className="profile__input"
                  type="email" id="email"
                  name="email"
                  value={values.email || currentUser.email}
                  minLength="4"
                  maxLength="40"
                  onChange={handleChange}
                  required 
                />
                <span className={`form__input-error ${!!errors.email && 'form__input-error_active'}`}>{errors.email}</span>
              </fieldset>
              <span className={`profile__errorMessage ${!!errorMessageApi && "profile__errorMessage_active"}`}>{errorMessageApi}</span>
              <button 
              className={`button profile__edit ${isButtonActive && "profile__edit_active"}`}
              disabled={!isButtonActive}
              >
                {isLoader ? "Сохранение..." : "Редактировать"}
              </button>
            </form>
          </div>

          <button type="button" className="button profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
        </section>
      </main>
    </>
  )
}

export default memo(Profile);