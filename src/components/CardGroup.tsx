import React from 'react';
import icons, { AvailableIcons } from '../helpers/icons';
import c from 'classnames';
import 'scss/components/CardGroup.scss';

export interface CardGroupProps {
  classnames?: string[] | string;
  title: string;
  icon: AvailableIcons;
};

const CardGroup: React.FC<CardGroupProps> = (props) => {
  return (
    <div className={c('card-group', props.classnames)}>
      <h1 className="card-group__title">{icons(props.icon)} {props.title}</h1>
      {props.children}
    </div>
  );
};

export default CardGroup;
