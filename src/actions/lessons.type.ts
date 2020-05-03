import { Section, NewSection, UpdateLesson, Lesson } from '../reducers/lessons.type';

export interface SetSections {
  type: 'SET_SECTIONS';
  payload: Section[];
}

export interface FetchLessonsIfNotExist {
  type: 'FETCH_LESSONS_IF_NOT_EXIST';
}

export interface FetchLessonsStart {
  type: 'FETCH_LESSONS_START';
}

export interface FetchLessonsSuccess {
  type: 'FETCH_LESSONS_SUCCESS';
  payload: Section[];
}

export interface FetchLessonsError {
  type: 'FETCH_LESSONS_ERROR';
  payload: string;
}

export interface CreateLessonSectionReset {
  type: 'CREATE_LESSON_SECTION_RESET';
}

export interface CreateLessonSectionStart {
  type: 'CREATE_LESSON_SECTION_START';
  payload: NewSection;
}

export interface CreateLessonSectionSuccess {
  type: 'CREATE_LESSON_SECTION_SUCCESS';
  payload: Section;
}

export interface CreateLessonSectionError {
  type: 'CREATE_LESSON_SECTION_ERROR';
  payload: string;
}

export interface UpdateLessonStart {
  type: 'UPDATE_LESSON_START';
  payload: UpdateLesson;
}

export interface UpdateLessonSuccess {
  type: 'UPDATE_LESSON_SUCCESS';
  payload: Lesson;
}

export interface UpdateLessonError {
  type: 'UPDATE_LESSON_ERROR';
  payload: string;
}

export type LessonsAction =
  SetSections                |
  FetchLessonsIfNotExist     |
  FetchLessonsStart          |
  FetchLessonsSuccess        |
  FetchLessonsError          |
  CreateLessonSectionReset   |
  CreateLessonSectionStart   |
  CreateLessonSectionSuccess |
  CreateLessonSectionError   |
  UpdateLessonStart          |
  UpdateLessonSuccess        |
  UpdateLessonError
;
