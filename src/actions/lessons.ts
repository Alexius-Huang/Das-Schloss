import { Section } from '../reducers/lessons';
import { SetSections } from './lessons.type'

export function setSections(sections: Section[]): SetSections {
  return {
    type: 'SET_SECTIONS',
    payload: sections
  };
};
