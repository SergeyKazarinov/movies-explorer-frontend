import { FC, MouseEvent } from "react";
import "./PopupWithInfo.scss";

interface IPopupWithInfo {
  isOpen: boolean;
  onClose: () => void;
  infoMessage: string;
  onCloseOverlay: (e: MouseEvent<HTMLElement>) => void;
  isError: boolean;
}

const PopupWithInfo: FC<IPopupWithInfo> = ({isOpen, onClose, infoMessage, onCloseOverlay, isError}) => {
  return(
    <section className={`popupWithInfo ${isOpen && "popupWithInfo_opened"}`} onMouseDown={onCloseOverlay}>
      <div className="popupWithInfo__container">
        <h2 className="popupWithInfo__title">{isError && "Ошибка"}</h2>
        <p className="popupWithInfo__subtitle">{infoMessage}</p>
        <button type="button" className="button popupWithInfo__button" onClick={onClose}>Ок</button>
      </div>
    </section>
  )
}

export default PopupWithInfo;