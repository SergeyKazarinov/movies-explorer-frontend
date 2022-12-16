import { ChangeEvent, FC } from "react";
import "./FilterCheckbox.scss";

interface IFilterCheckbox {
  onChangeChecked: (checked: boolean) => void;
  isShort?: boolean;
}

const FilterCheckbox: FC<IFilterCheckbox> = ({onChangeChecked, isShort}) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked(e.target.checked)
  }

  return(
  <div className="filterCheckbox">
    <label className="filterCheckbox__switch" htmlFor="checkbox">
      <input type="checkbox" id="checkbox" className="filterCheckbox__input" defaultChecked={isShort} onChange={handleChange}/>
      <div className="filterCheckbox__slider"></div>
    </label>
    Короткометражки
  </div>
  )
}

export default FilterCheckbox;