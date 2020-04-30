import React from 'react';
import classnames from 'classnames';
import '../scss/components/Form.scss';

interface FormProps {
  name: string;
  title?: string;
  classnames?: string | string[];
  onSubmit?: () => void;
}

const Form: React.FC<FormProps> = (props) => {
  const { name, title } = props;
  const specificClassname = `form__${name}`;

  return (
    <form className={classnames('form', specificClassname, props.classnames)}>
      <h1 className="form__title">{title ?? name}</h1>

      <div className="form__input-field-wrapper">
        {props.children}
      </div>

      <div className="form__button-field-wrapper">
        <button
          className="button button-rect button-rect--dark"
          onClick={(event) => {
            event.preventDefault();
            props.onSubmit?.();
          }}
        >Submit</button>
      </div>
    </form>
  );
};

export default Form;
