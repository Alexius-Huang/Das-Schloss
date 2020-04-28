import { LessonsAction } from '../actions/lessons.type';
import * as T from './lessons.type';

const defaultState: T.LessonsState = {
  sections: [],
  fetchState: T.LessonFetchState.INCOMPLETE,
  error: null
};

export default function (state = defaultState, action: LessonsAction): T.LessonsState {
  switch (action.type) {
    case 'SET_SECTIONS':
      return { ...state, sections: action.payload };
    case 'FETCH_LESSONS_START':
      return { ...state, fetchState: T.LessonFetchState.PROCESSING, error: null };
    case 'FETCH_LESSONS_SUCCESS':
      return { ...state, fetchState: T.LessonFetchState.COMPLETED };
    case 'FETCH_LESSONS_ERROR':
      return { ...state, fetchState: T.LessonFetchState.ERROR, error: action.payload };
    default:
      return state;
  }
}
