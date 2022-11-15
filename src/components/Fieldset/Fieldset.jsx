import "./Fieldset.css";

const Fieldset = ({inputType, inputClassType, placeholder, value}) => {
  const isValid = true;
  return(
    <fieldset className="form__set">
      <legend className="form__legend">{placeholder}</legend>
      <input 
        type={inputType}
        className={`form__input_type_${inputClassType} form__input  ${!isValid && 'form__input_type_error'}`}
        required
        />
    </fieldset>
  )
};

export default Fieldset;