import style from "./Fieldset.scss";

const Fieldset = ({inputType, inputClassType, placeholder, name, minLength, maxLength, onChange, errors, isValid, pattern}) => {

  return(
    <fieldset className="form__set">
      <legend className="form__legend">{placeholder}</legend>
      <input 
        type={inputType}
        name={name}
        className={`form__input_type_${inputClassType} form__input  ${errors[name] && 'form__input_type_error'}`}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required
      />
      <span className={`form__inputError ${!isValid && 'form__inputError_active'}`}>{errors[name]}</span>
    </fieldset>
  )
};

export default Fieldset;