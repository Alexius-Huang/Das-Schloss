import { Section, NewSection, UpdateLesson, Lesson, LessonContent } from '../redux.reducers/lessons.type';
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

export function fetchLessonContentReset(): A.FetchLessonContentReset {
  return { type: 'FETCH_LESSON_CONTENT_RESET' };
}

export function fetchLessonContentStart(lessonId: number): A.FetchLessonContentStart {
  return {
    type: 'FETCH_LESSON_CONTENT_START',
    payload: { lessonId },
  };
}

export function fetchLessonContentSuccess(response: LessonContent): A.FetchLessonContentSuccess {
  return {
    type: 'FETCH_LESSON_CONTENT_SUCCESS',
    payload: response,
  };
}

export function fetchLessonContentError(message: string): A.FetchLessonContentError {
  return {
    type: 'FETCH_LESSON_CONTENT_ERROR',
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

export function updateLessonStart(params: UpdateLesson): A.UpdateLessonStart {
  return {
    type: 'UPDATE_LESSON_START',
    payload: params,
  };
}

export function updateLessonSuccess(response: Lesson): A.UpdateLessonSuccess {
  return {
    type: 'UPDATE_LESSON_SUCCESS',
    payload: response,
  };
}

export function updateLessonError(message: string): A.UpdateLessonError {
  return {
    type: 'UPDATE_LESSON_ERROR',
    payload: message,
  };
}

export function selectLesson(lesson: Lesson): A.SelectLesson {
  return {
    type: 'SELECT_LESSON',
    payload: lesson,
  };
}
