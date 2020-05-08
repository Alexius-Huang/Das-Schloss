import React from 'react';
import c from 'classnames';

interface NounProps {
  translation: string;
  gender: 'm' | 'f' | 'n';
  plural: null | string;
}

const Noun: React.FC<NounProps> = (props) => {
  const artikel = (
    (props.gender === 'm') ? 'der' :
    (props.gender === 'f') ? 'die' :
    'das'
  );

  const plural = props.plural !== null ? `/ die ${props.plural}` : undefined;

  return (
    <div className={c('vocabulary-noun', `vocabulary-noun--${props.gender}`)}>
      <p className="vocabulary-noun__value">{artikel} {props.children} {plural}</p>
      <p className="vocabulary-noun__translation">{props.translation}</p>
    </div>
  );
};

export default Noun;
