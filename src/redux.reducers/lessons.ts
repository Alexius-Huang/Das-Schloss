import { LessonsAction } from '../redux.actions/lessons.type';
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
  createLessonSection: transaction<T.CreateLessonSectionTransaction>(),
  updateLesson: transaction<T.UpdateLessonTransaction>(),
  updateLessonContent: transaction<T.UpdateLessonContentTransaction>(),
  fetchLessonContent: transaction<T.FetchLessonContentTransaction>(),
  error: null,

  selectedLesson: null,
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

    case 'FETCH_LESSON_CONTENT_RESET':
      return { ...state, fetchLessonContent: transaction<T.FetchLessonContentTransaction>() };
    case 'FETCH_LESSON_CONTENT_START':
      return {
        ...state,
        fetchLessonContent: transaction<T.FetchLessonContentTransaction>({
          state: T.APIState.PROCESSING,
          params: action.payload,
        }),
      };
    case 'FETCH_LESSON_CONTENT_SUCCESS':
      return {
        ...state,
        fetchLessonContent: transaction<T.FetchLessonContentTransaction>({
          state: T.APIState.STATIC,
          instance: action.payload
        }),
      };
    case 'FETCH_LESSON_CONTENT_ERROR':
      return {
        ...state,
        fetchLessonContent: transaction<T.FetchLessonContentTransaction>({
          state: T.APIState.ERROR,
          error: action.payload
        })
      };

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
        updateLesson: transaction<T.UpdateLessonTransaction>({
          state: T.APIState.PROCESSING,
          params: action.payload
        }),
      };
    case 'UPDATE_LESSON_SUCCESS':
      const lesson = action.payload;

      // TODO: Find ways to refactor this
      const sections = [...state.sections];
      const section = sections.find(s => s.id === (lesson as any).lesson_section_id) as T.Section;
      const lessonId = section.lessons.findIndex(l => l.id === lesson.id);
      section.lessons[lessonId] = lesson;

      return {
        ...state,
        sections,
        updateLesson: transaction<T.UpdateLessonTransaction>({
          state: T.APIState.STATIC,
          instance: lesson,
        }),
      };
    case 'UPDATE_LESSON_ERROR':
      return {
        ...state,
        updateLesson: transaction<T.UpdateLessonTransaction>({
          state: T.APIState.ERROR,
          error: action.payload,
        }),
      };

    case 'UPDATE_LESSON_CONTENT_START':
      return {
        ...state,
        updateLessonContent: transaction<T.UpdateLessonContentTransaction>({
          state: T.APIState.PROCESSING,
          params: action.payload
        }),
      };
    case 'UPDATE_LESSON_CONTENT_SUCCESS':
      return {
        ...state,
        updateLessonContent: transaction<T.UpdateLessonContentTransaction>({
          state: T.APIState.STATIC,
          instance: action.payload
        }),
      };
    case 'UPDATE_LESSON_CONTENT_ERROR':
      return {
        ...state,
        updateLessonContent: transaction<T.UpdateLessonContentTransaction>({
          state: T.APIState.ERROR,
          error: action.payload,
        }),
      };

    case 'SELECT_LESSON':
      return { ...state, selectedLesson: action.payload };
    default:
      return state;
  }
}
