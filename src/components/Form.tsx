import React, { useRef } from 'react';
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
  onSubmit?: (formData: any) => void;
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
      break;
    default:
      buttonStyleClass = `button-rect--${sbo?.style}`;
  }

  const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

  return (
    <form
      className={c('form', specificClassname, props.classnames)}
      ref={formRef}
    >
      {title && <h1 className="form__title">{title}</h1>}

      <div className="form__input-field-wrapper">
        {props.children}
      </div>

      <div className="form__button-field-wrapper">
        <button
          className={c('button', 'button-rect', buttonStyleClass)}
          onClick={(event) => {
            event.preventDefault();
            if (props.onSubmit !== undefined) {
              const formData = new FormData(formRef.current as HTMLFormElement);
              const formDataJSON = Object.fromEntries(formData);
              props.onSubmit(formDataJSON);
            }
          }}
        >{sbo?.content ?? 'Submit'}</button>
      </div>
    </form>
  );
};

export default Form;
export { default as TextField } from './Form/TextField';
export { default as OptionField } from './Form/OptionField';
export { default as MarkdownField } from './Form/MarkdownField';
