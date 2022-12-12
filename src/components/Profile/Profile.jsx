import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { onUpdateUser } from "../../services/crateAsyncAction/user";
import "./Profile.scss";

const Profile = ({onSignOut}) => {
  const { user, errorMessageApi, pending } = useSelector(state => state.user);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const isButtonActive = (isValid && (user.name !== values.name || user.email !== values.email));
  const dispatch = useDispatch();

  useEffect(() => {
    resetForm(user);
  }, [resetForm, user])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    dispatch(onUpdateUser({
      name: values.name,
      email: values.email
    }));
  }, [values]);
  
  return(
    <section className="profile">
      <h2 className="profile__title">Привет, {user.name}!</h2>
      <div className="profile__container">
        <form className="form profile__form" name="profileEdit" onSubmit={handleSubmit} noValidate>
          <fieldset className="profile__flex">
            <label htmlFor="name" className="profile__text">Имя</label>
            <input 
              className="profile__input"
              type="text" id="name"
              name="name"
              value={values.name || user.name}
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
              value={values.email || user.email}
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
          disabled={!isButtonActive || pending}
          >
            {pending ? "Сохранение..." : "Редактировать"}
          </button>
        </form>
      </div>

      <button type="button" className="button profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
    </section>
  )
}

export default memo(Profile);