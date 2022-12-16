import { FC } from "react";
import s from "./Button.module.scss";

interface IButton {
  buttonName: string;
  onClick: () => void;
}

export const Button: FC<IButton> = ({buttonName, onClick}) => {
  return(
    <button type="button" className={`button ${s.button}`} onClick={onClick}>
      {buttonName}
    </button>
  )
}