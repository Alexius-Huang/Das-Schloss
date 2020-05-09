export enum GenderType {
  Male = 'm',
  Female = 'f',
  Neutral = 'n'
};

export type Noun = {
  id: string;
  name: string;
  translation: string;
  gender: GenderType;
  plural: null | string;
  info: string;
};

// expor type NewNoun;

export type Verb = {
  id: string;
  name: string;
  translation: string;
  info: string;
  ipc: IndicativePresentConjugation;
};

// expor type NewVerb;

export type IndicativePresentConjugation = {
  firstPerson: string;
  secondPerson: string;
  thirdPerson: string;
  firstPersonPlural: string;
  secondPersonPlural: string;
  thirdPersonPlural: string;
};
