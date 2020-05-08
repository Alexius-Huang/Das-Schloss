export enum GenderType {
  Male = 'm',
  Female = 'f',
  Neutral = 'n'
};

export interface Noun {
  id: number;
  name: string;
  translation: string;
  gender: GenderType;
  plural: string | null;
  info: string;
}

export interface NewNoun {
  name: string;
  translation: string;
  gender: GenderType;
  plural?: string | null;
  info?: string;  
}

// export type UpdateNoun;

export interface Verb {
  id: number;
  name: string;
  translation: string;
  info: string;
  IPC: IndicativePresentConjugation;
}

export interface NewVerb {
  name: string;
  translation: string;
  info?: string;
  IPC: IndicativePresentConjugation;
}

// export type UpdateVerb;

export interface IndicativePresentConjugation {
  id: string;
  firstPerson: string;
  secondPerson: string;
  thirdPerson: string;
  firstPersonPlural: string;
  secondPersonPlural: string;
  thirdPersonPlural: string;
}
