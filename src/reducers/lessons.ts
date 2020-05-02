import { LessonsAction } from '../actions/lessons.type';
import * as T from './lessons.type';

const defaultState: T.LessonsState = {
  sections: [],
  fetchState: T.LessonFetchState.INCOMPLETE,
  error: null,
  createLessonSection: {
    state: T.CreateLessonSectionState.STATIC,
    createdInstance: null,
    params: null,
    error: null,
  },
};

export default function (state = defaultState, action: LessonsAction): T.LessonsState {
  switch (action.type) {
    case 'SET_SECTIONS':
      return { ...state, sections: action.payload };
    case 'FETCH_LESSONS_START':
      return { ...state, fetchState: T.LessonFetchState.PROCESSING, error: null };
    case 'FETCH_LESSONS_SUCCESS':
      return { ...state, fetchState: T.LessonFetchState.COMPLETED, sections: action.payload };
    case 'FETCH_LESSONS_ERROR':
      return { ...state, fetchState: T.LessonFetchState.ERROR, error: action.payload };

    case 'CREATE_LESSON_SECTION_RESET':
      return {
        ...state,
        createLessonSection: {
          state: T.CreateLessonSectionState.STATIC,
          createdInstance: null,
          params: null,
          error: null,
        },
      };
    case 'CREATE_LESSON_SECTION_START':
      return {
        ...state,
        createLessonSection: {
          state: T.CreateLessonSectionState.PROCESSING,
          createdInstance: null,
          params: action.payload,
          error: null,
        },
      };
    case 'CREATE_LESSON_SECTION_SUCCESS':
      return {
        ...state,
        sections: [...state.sections, action.payload],
        createLessonSection: {
          state: T.CreateLessonSectionState.STATIC,
          createdInstance: action.payload,
          params: null,
          error: null,
        },
      };
    case 'CREATE_LESSON_SECTION_ERROR':
      return {
        ...state,
        createLessonSection: {
          state: T.CreateLessonSectionState.ERROR,
          createdInstance: null,
          params: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
