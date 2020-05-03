import { LessonsAction } from '../actions/lessons.type';
import * as T from './lessons.type';

function transaction<U extends T.LessonTransactions>(params?: Partial<U>) {
  return {
    state: params?.state ?? T.APIState.STATIC,
    instance: params?.instance ?? null,
    params: params?.params ?? null,
    error: params?.error ?? null,
  };
}

const defaultState: T.LessonsState = {
  sections: [],
  fetchState: T.LessonFetchState.INCOMPLETE,
  error: null,
  createLessonSection: transaction<T.CreateLessonSectionTransaction>(),
  updateLessonSection: transaction<T.UpdateLessonTransaction>(),
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
        createLessonSection: transaction<T.CreateLessonSectionTransaction>(),
      };
    case 'CREATE_LESSON_SECTION_START':
      return {
        ...state,
        createLessonSection: transaction<T.CreateLessonSectionTransaction>({
          state: T.APIState.PROCESSING,
          params: action.payload
        }),
      };
    case 'CREATE_LESSON_SECTION_SUCCESS':
      return {
        ...state,
        sections: [...state.sections, action.payload],
        createLessonSection: transaction<T.CreateLessonSectionTransaction>({
          state: T.APIState.STATIC,
          instance: action.payload
        }),
      };
    case 'CREATE_LESSON_SECTION_ERROR':
      return {
        ...state,
        createLessonSection: transaction<T.CreateLessonSectionTransaction>({
          state: T.APIState.ERROR,
          error: action.payload,
        }),
      };

    case 'UPDATE_LESSON_START':
      return {
        ...state,
        updateLessonSection: transaction<T.UpdateLessonTransaction>({
          state: T.APIState.PROCESSING,
          params: action.payload
        }),
      };
    case 'UPDATE_LESSON_SUCCESS':
      const lesson = action.payload;

      // TODO: Update lesson in the section!
      console.log(lesson);

      return {
        ...state,
        updateLessonSection: transaction<T.UpdateLessonTransaction>({
          state: T.APIState.STATIC,
          instance: lesson,
        }),
      };
    case 'UPDATE_LESSON_ERROR':
      return {
        ...state,
        updateLessonSection: transaction<T.UpdateLessonTransaction>({
          state: T.APIState.ERROR,
          error: action.payload,
        }),
      };
    default:
      return state;
  }
}
