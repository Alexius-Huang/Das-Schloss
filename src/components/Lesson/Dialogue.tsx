import React from 'react';

interface DialogueProps {
  translation: string;
}

const Dialogue: React.FC<DialogueProps> = (props) => {
  return (
    <div className="dialogue">
      <div className="dialogue__wrapper">
        <p className="dialogue__content">{props.children}</p>
        <p className="dialogue__translation">{props.translation}</p>
      </div>
    </div>
  )
};

export default Dialogue;
