import React from 'react';
import { IndicativePresentConjugation } from '../../redux.reducers/vocabulary.type';

interface VerbProps {
  translation: string;
  ipc: IndicativePresentConjugation;
  // info?: string;
}

const Verb: React.FC<VerbProps> = (props) => {
  const {
    firstPerson: fp,
    secondPerson: sp,
    thirdPerson: thp,
    firstPersonPlural: fpp,
    secondPersonPlural: spp,
    thirdPersonPlural: thpp
  } = props.ipc;

  return (
    <div className="vocabulary-verb">
      <p className="vocabulary-verb__value"><b>{props.children}</b> <span className="vocabulary-verb__translation">{props.translation}</span></p>
      <div className="vocabulary-verb__ipc">
        <div className="vocabulary-verb__ipc-singular">
          <p>ich <span className="vocabulary-verb__ipc-form">{fp}</span></p>
          <p>du <span className="vocabulary-verb__ipc-form">{sp}</span></p>
          <p>er/sie/es <span className="vocabulary-verb__ipc-form">{thp}</span></p>
        </div>
        <div className="vocabulary-verb__ipc-plural">
          <p>wir <span className="vocabulary-verb__ipc-form">{fpp}</span></p>
          <p>ihr <span className="vocabulary-verb__ipc-form">{spp}</span></p>
          <p>sie/Sie <span className="vocabulary-verb__ipc-form">{thpp}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Verb;
