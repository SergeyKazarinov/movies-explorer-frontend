import "./Fieldset.css";

const Fieldset = ({inputType, inputClassType, placeholder, errorMessage}) => {
  const isValid = false;
  return(
    <fieldset className="form__set">
      <legend className="form__legend">{placeholder}</legend>
      <input 
        type={inputType}
        className={`form__input_type_${inputClassType} form__input  ${!isValid && 'form__input_type_error'}`}
        required
      />
      <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>{errorMessage}</span>
    </fieldset>
  )
};

export default Fieldset;