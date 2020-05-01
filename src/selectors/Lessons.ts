import { RootState } from "../reducers";

export function sectionsSelector(state: RootState) {
  return state.Lessons.sections;
}

export function lessonFetchStateSelector(state: RootState) {
  return state.Lessons.fetchState;
}
