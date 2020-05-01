import React, { useState, useEffect } from 'react';
import c from 'classnames';

interface OptionFieldProps {
  name: string;
  value: string;
  title?: string;
  options: ({ value: string; name: string })[];
  onChange?: (value: any) => void;
  bindState?: React.Dispatch<React.SetStateAction<any>>;
}

const OptionField: React.FC<OptionFieldProps> = (props) => {
  const { name, options } = props;
  const fieldClass = `option-field--${name}`;
  const selectedName = options.find(({ value }) => value === props.value)!.name;
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleCloseDropdown = () => {
    setDropdownActive(false);
  };

  useEffect(() => {
    if (dropdownActive) {
      document.addEventListener('click', handleCloseDropdown);
    }

    return () => {
      document.removeEventListener('click', handleCloseDropdown);
    };
  }, [dropdownActive]);

  return (
    <div className="form__field option-field">
      <label className="form__field-label option-field__label" htmlFor={fieldClass}>{props.title ?? name}</label><br />
      <select
        className="option-field__select"
        name="type"
        id={fieldClass}
        onChange={() => {}}
        value={props.value}
      >
        {
          options.map(({ value, name }) => (
            <option key={value} value={value}>{name}</option>
          ))
        }
      </select>

      <div className="option-field__dropdown-list">
        <p className="option-field__selected">
          <button className="button button--inherit"
            onClick={(event) => {
              event.preventDefault();
              setDropdownActive(!dropdownActive);
            }}
          >{selectedName}</button>
        </p>
        <ul className={c('option-field__option-list', dropdownActive ? 'option-field__option-list--active' : '')}>
          {
            options.map(({ value, name }) => (
              <li key={value} className="option-field__option-list-item">
                <button
                  className="button button--inherit"
                  onClick={(event) => {
                    event.preventDefault();
                    props.bindState?.(value);
                    props.onChange?.(value);
                    setDropdownActive(false);
                  }}
                >{name}</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
};

export default OptionField;
