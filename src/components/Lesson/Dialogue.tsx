import React from 'react';
import c from 'classnames';

interface DialogueProps {
  translation: string;
  right?: boolean;
}

const Dialogue: React.FC<DialogueProps> = (props) => {
  return (
    <div className={c('dialogue', props.right ? 'dialogue--right' : '')}>
      <div className="dialogue__wrapper">
        <p className="dialogue__content">{props.children}</p>
        <p className="dialogue__translation">{props.translation}</p>
      </div>
    </div>
  )
};

export default Dialogue;
