import { FC } from "react";
import { IFieldsetProps } from "../../../interface/Props/IForm";
import "./Fieldset.scss";

const Fieldset: FC<IFieldsetProps> = ({inputType, inputClassType, placeholder, name, minLength, maxLength, onChange, errors, isValid, pattern}) => {

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
      <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>{errors[name]}</span>
    </fieldset>
  )
};

export default Fieldset;