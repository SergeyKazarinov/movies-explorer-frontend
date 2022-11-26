import "./FilterCheckbox.css";

const FilterCheckbox = ({onChangeChecked, isShort}) => {

  const handleChange = (e) => {
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