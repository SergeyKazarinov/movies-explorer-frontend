import s from "./Button.module.scss";

export const Button = ({buttonName, onClick}) => {
  return(
    <button type="button" className={`button ${s.button}`} onClick={onClick} >{buttonName}</button>
  )
}