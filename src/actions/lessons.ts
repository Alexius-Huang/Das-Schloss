import { Section, NewSection } from '../reducers/lessons.type';
import * as A from './lessons.type';

export function setSections(sections: Section[]): A.SetSections {
  return {
    type: 'SET_SECTIONS',
    payload: sections
  };
}

export function fetchLessonsIfNotExist(): A.FetchLessonsIfNotExist {
  return { type: 'FETCH_LESSONS_IF_NOT_EXIST' };
}

export function fetchLessonsStart(): A.FetchLessonsStart {
  return { type: 'FETCH_LESSONS_START' };
}

export function fetchLessonsSuccess(response: Section[]): A.FetchLessonsSuccess {
  return {
    type: 'FETCH_LESSONS_SUCCESS',
    payload: response,
  };
}

export function fetchLessonsError(message: string): A.FetchLessonsError {
  return {
    type: 'FETCH_LESSONS_ERROR',
    payload: message,
  };
}

export function createLessonSectionReset(): A.CreateLessonSectionReset {
  return { type: 'CREATE_LESSON_SECTION_RESET' };
}

export function createLessonSectionStart(params: NewSection): A.CreateLessonSectionStart {
  return {
    type: 'CREATE_LESSON_SECTION_START',
    payload: params,
  };
}

export function createLessonSectionSuccess(response: Section): A.CreateLessonSectionSuccess {
  return {
    type: 'CREATE_LESSON_SECTION_SUCCESS',
    payload: response,
  };
}

export function createLessonSectionError(message: string): A.CreateLessonSectionError {
  return {
    type: 'CREATE_LESSON_SECTION_ERROR',
    payload: message,
  };
}
