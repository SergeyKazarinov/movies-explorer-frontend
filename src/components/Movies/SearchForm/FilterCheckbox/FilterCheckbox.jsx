import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return(
  <div class="filterCheckbox">
    <label class="filterCheckbox__switch" for="checkbox">
      <input type="checkbox" id="checkbox" className="filterCheckbox__input"/>
      <div class="filterCheckbox__slider"></div>
    </label>
    Короткометражки
  </div>
  )
}

export default FilterCheckbox;