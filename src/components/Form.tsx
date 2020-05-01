import React from 'react';
import c from 'classnames';
import '../scss/components/Form.scss';

type SubmitButtonOption = {
  content?: string;
  style?: 'normal' | 'success' | 'warning' | 'error' | 'light';
}

interface FormProps {
  name: string;
  title?: string;
  classnames?: string | string[];
  onSubmit?: () => void;
  submitButtonOption?: SubmitButtonOption;
}

const Form: React.FC<FormProps> = (props) => {
  const { name, title } = props;
  const specificClassname = `form__${name}`;
  const { submitButtonOption: sbo } = props;
  let buttonStyleClass: string;

  switch (sbo?.style) {
    case undefined:
    case 'normal':
      buttonStyleClass = 'button-rect--dark';
    default:
      buttonStyleClass = `button-rect--${sbo?.style}`;
  }

  return (
    <form className={c('form', specificClassname, props.classnames)}>
      {title && <h1 className="form__title">{title}</h1>}

      <div className="form__input-field-wrapper">
        {props.children}
      </div>

      <div className="form__button-field-wrapper">
        <button
          className={c('button', 'button-rect', buttonStyleClass)}
          onClick={(event) => {
            event.preventDefault();
            props.onSubmit?.();
          }}
        >{sbo?.content ?? 'Submit'}</button>
      </div>
    </form>
  );
};

export default Form;
export { default as TextField } from './Form.TextField';
export { default as OptionField } from './Form.OptionField';
