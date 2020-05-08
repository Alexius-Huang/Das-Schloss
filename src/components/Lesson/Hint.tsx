import React from 'react';

interface HintProps {
  title?: string;
}

const Hint: React.FC<HintProps> = (props) => {
  return (
    <div className="hint">
      <p className="hint__title">{props.title ?? 'Hint'}</p>
      <div className="hint__content">{props.children}</div>
    </div>
  );
};

export default Hint;
