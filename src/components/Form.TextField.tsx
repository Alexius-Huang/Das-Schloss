import React from 'react';
import 'scss/components/Form.TextField.scss';

interface InputFieldProps {
  name: string;
  title?: string;
  placeholder?: string;
  onInput?: (value: string) => void;
  bindState?: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { name } = props;
  const fieldClass = `text-field--${name}`;

  return (
    <div className="text-field">
      <label className="text-field__label" htmlFor={fieldClass}>{props.title ?? name}</label><br />
      <input
        type={name === 'password' ? name : 'text'}
        className="text-field__input"
        id={fieldClass}
        placeholder={props.placeholder ?? ''}
        onChange={(event) => {
          props.bindState?.(event.target.value);
          props.onInput?.(event.target.value);
        }}
      />
    </div>
  );
};

export default InputField;
