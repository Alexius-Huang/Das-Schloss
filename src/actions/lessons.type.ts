import { Section } from '../reducers/lessons.type';

export interface SetSections {
  type: 'SET_SECTIONS';
  payload: Section[];
}

export interface FetchLessonsStart {
  type: 'FETCH_LESSONS_START';
  payload?: undefined;
}

export interface FetchLessonsSuccess {
  type: 'FETCH_LESSONS_SUCCESS',
  payload: Section[];
}

export interface FetchLessonsError {
  type: 'FETCH_LESSONS_ERROR',
  payload: string;
}

export type LessonsAction =
  SetSections         |
  FetchLessonsStart   |
  FetchLessonsSuccess |
  FetchLessonsError
;
