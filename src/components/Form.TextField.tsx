import React from 'react';

interface InputFieldProps {
  name: string;
  value: string;
  title?: string;
  placeholder?: string;
  onInput?: (value: any) => void;
  bindState?: React.Dispatch<React.SetStateAction<any>>;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { name } = props;
  const fieldClass = `text-field--${name}`;

  return (
    <div className="form__field text-field">
      <label className="form__field-label text-field__label" htmlFor={fieldClass}>{props.title ?? name}</label><br />
      <input
        type={name === 'password' ? name : 'text'}
        className="text-field__input"
        id={fieldClass}
        value={props.value}
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
