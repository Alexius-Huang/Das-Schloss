import { Section } from '../reducers/lessons.type';
import * as A from './lessons.type';

export function setSections(sections: Section[]): A.SetSections {
  return {
    type: 'SET_SECTIONS',
    payload: sections
  };
};

export function fetchLessonsIfNotExist(): A.FetchLessonsIfNotExist {
  return { type: 'FETCH_LESSONS_IF_NOT_EXIST' };
};

export function fetchLessonsStart(): A.FetchLessonsStart {
  return { type: 'FETCH_LESSONS_START' };
};

export function fetchLessonsSuccess(response: Section[]): A.FetchLessonsSuccess {
  return {
    type: 'FETCH_LESSONS_SUCCESS',
    payload: response,
  };
};

export function fetchLessonsFailure(message: string): A.FetchLessonsError {
  return {
    type: 'FETCH_LESSONS_ERROR',
    payload: message,
  };
};
