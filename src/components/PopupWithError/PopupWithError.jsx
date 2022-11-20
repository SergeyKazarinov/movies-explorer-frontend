import "./PopupWithError.css";

const PopupWithError = ({isOpen, onClose, errorMessage, onCLoseOverlay}) => {
  return(
    <section className={`popupWithError ${isOpen && "popupWithError_opened"}`} onMouseDown={onCLoseOverlay}>
      <div className="popupWithError__container">
        <h2 className="popupWithError__title">Ошибка</h2>
        <p className="popupWithError__subtitle">{errorMessage}</p>
        <button type="button" className="button popupWithError__button" onClick={onClose}>Ок</button>
      </div>

    </section>
  )
}

export default PopupWithError;