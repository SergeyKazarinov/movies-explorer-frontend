import { ChangeEvent } from "react";

export interface IValues {
  [name: string]: string
}

export interface IErrors {
  [name: string]: string;
}

export interface IFieldsetProps {
  inputType: string;
  inputClassType: string,
  placeholder: string;
  pattern?: string;
  name: string;
  minLength: number;
  maxLength: number;
  onChange: (event: ChangeEvent<HTMLFormElement & HTMLInputElement>) => void;
  errors: any;
  isValid: boolean;
}