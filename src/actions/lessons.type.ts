import { Section } from '../reducers/lessons';

export interface SetSections {
  type: 'SET_SECTIONS';
  payload: Section[];
}

export type LessonsAction = SetSections;
