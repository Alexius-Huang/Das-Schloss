import * as T from '../redux.reducers/lessons.type';

export interface SetSections {
  type: 'SET_SECTIONS';
  payload: T.Section[];
}

export interface FetchLessonsIfNotExist {
  type: 'FETCH_LESSONS_IF_NOT_EXIST';
}

export interface FetchLessonsStart {
  type: 'FETCH_LESSONS_START';
}

export interface FetchLessonsSuccess {
  type: 'FETCH_LESSONS_SUCCESS';
  payload: T.Section[];
}

export interface FetchLessonsError {
  type: 'FETCH_LESSONS_ERROR';
  payload: string;
}

export interface FetchLessonContentReset {
  type: 'FETCH_LESSON_CONTENT_RESET';
}

export interface FetchLessonContentStart {
  type: 'FETCH_LESSON_CONTENT_START';
  payload: { lessonId: number };
}

export interface FetchLessonContentSuccess {
  type: 'FETCH_LESSON_CONTENT_SUCCESS';
  payload: T.LessonContent;
}

export interface FetchLessonContentError {
  type: 'FETCH_LESSON_CONTENT_ERROR';
  payload: string;
}

export interface CreateLessonSectionReset {
  type: 'CREATE_LESSON_SECTION_RESET';
}

export interface CreateLessonSectionStart {
  type: 'CREATE_LESSON_SECTION_START';
  payload: T.NewSection;
}

export interface CreateLessonSectionSuccess {
  type: 'CREATE_LESSON_SECTION_SUCCESS';
  payload: T.Section;
}

export interface CreateLessonSectionError {
  type: 'CREATE_LESSON_SECTION_ERROR';
  payload: string;
}

export interface UpdateLessonStart {
  type: 'UPDATE_LESSON_START';
  payload: T.UpdateLesson;
}

export interface UpdateLessonSuccess {
  type: 'UPDATE_LESSON_SUCCESS';
  payload: T.Lesson;
}

export interface UpdateLessonError {
  type: 'UPDATE_LESSON_ERROR';
  payload: string;
}

export interface UpdateLessonContentStart {
  type: 'UPDATE_LESSON_CONTENT_START';
  payload: T.UpdateLessonContent;
}

export interface UpdateLessonContentSuccess {
  type: 'UPDATE_LESSON_CONTENT_SUCCESS';
  payload: T.LessonContent;
}

export interface UpdateLessonContentError {
  type: 'UPDATE_LESSON_CONTENT_ERROR';
  payload: string;
}

export interface SelectLesson {
  type: 'SELECT_LESSON';
  payload: T.Lesson;
}

export type LessonsAction =
  SetSections                |
  FetchLessonsIfNotExist     |
  FetchLessonsStart          |
  FetchLessonsSuccess        |
  FetchLessonsError          |
  FetchLessonContentReset    |
  FetchLessonContentStart    |
  FetchLessonContentSuccess  |
  FetchLessonContentError    |
  CreateLessonSectionReset   |
  CreateLessonSectionStart   |
  CreateLessonSectionSuccess |
  CreateLessonSectionError   |
  UpdateLessonStart          |
  UpdateLessonSuccess        |
  UpdateLessonError          |
  UpdateLessonContentStart   |
  UpdateLessonContentSuccess |
  UpdateLessonContentError   |
  SelectLesson
;
