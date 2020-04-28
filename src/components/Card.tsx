import React from 'react';
import icons, { AvailableIcons } from '../helpers/icons';
import c from 'classnames';
import 'scss/components/Card.scss';

export interface CardProps {
  classnames?: string[] | string;
  title: string;
  icon: AvailableIcons;
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <li className={c('card', props.classnames)}>
      <button className="card__wrapper-button">
        <span className="card__img-wrapper">
          {icons(props.icon)}
        </span>
        <span className="card__title">{props.title}</span>
      </button>
    </li>
  );
}

export default Card;
