import { RootState } from "../redux.reducers";

export function selectSections(state: RootState) {
  return state.Lessons.sections;
}

export function selectLessonFetchState(state: RootState) {
  return state.Lessons.fetchState;
}

export function selectLessonContentFetchState(state: RootState) {
  return state.Lessons.fetchLessonContent;
}

export function selectLesson(state: RootState) {
  return state.Lessons.selectedLesson;
}
