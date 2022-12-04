import "./PopupWithInfo.scss";

const PopupWithInfo = ({isOpen, onClose, infoMessage, onCLoseOverlay, isError}) => {
  return(
    <section className={`popupWithInfo ${isOpen && "popupWithInfo_opened"}`} onMouseDown={onCLoseOverlay}>
      <div className="popupWithInfo__container">
        <h2 className="popupWithInfo__title">{isError && "Ошибка"}</h2>
        <p className="popupWithInfo__subtitle">{infoMessage}</p>
        <button type="button" className="button popupWithInfo__button" onClick={onClose}>Ок</button>
      </div>
    </section>
  )
}

export default PopupWithInfo;