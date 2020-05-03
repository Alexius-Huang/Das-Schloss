import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchAllLessons, createLessonSection, updateLesson } from '../api/lessons';
import * as LessonActions from '../actions/lessons';
import { LessonFetchState, NewSection, UpdateLesson } from '../reducers/lessons.type';
import { lessonFetchStateSelector } from '../selectors/Lessons';
import { RootState } from '../reducers';

function* fetchLessonsIfNotExistsTransaction() {
  const fetchState = yield select(lessonFetchStateSelector);
  if (fetchState === LessonFetchState.INCOMPLETE)
    yield put(LessonActions.fetchLessonsStart());
}

function* fetchLatestLessonsTransaction() {
  try {
    const response = yield call(fetchAllLessons);
    yield put(LessonActions.fetchLessonsSuccess(response));
  } catch (err) {
    yield put(LessonActions.fetchLessonsError(err));
  }
}

function* createLessonSectionTransaction() {
  try {
    const newSection: NewSection = yield select(
      (state: RootState) => state.Lessons.createLessonSection.params
    );
    const response = yield call(createLessonSection, newSection);
    yield put(LessonActions.createLessonSectionSuccess(response));
  } catch (err) {
    yield put(LessonActions.createLessonSectionError(err));
  }
}

function* updateLessonTransaction() {
  try {
    const params: UpdateLesson = yield select(
      (state: RootState) => state.Lessons.updateLessonSection.params
    );
    const response = yield call(updateLesson, params);
    yield put(LessonActions.updateLessonSuccess(response));
  } catch (err) {
    yield put(LessonActions.updateLessonError(err));
  }
}

function* watchLessons() {
  yield takeLatest('FETCH_LESSONS_IF_NOT_EXIST', fetchLessonsIfNotExistsTransaction);
  yield takeLatest('FETCH_LESSONS_START', fetchLatestLessonsTransaction);
  yield takeLatest('CREATE_LESSON_SECTION_START', createLessonSectionTransaction);
  yield takeLatest('UPDATE_LESSON_START', updateLessonTransaction);
}

export default function* () {
  yield all([
    call(watchLessons),
  ]);
}
