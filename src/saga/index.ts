import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchAllLessons } from '../api/lessons';
import { fetchLessonsSuccess, fetchLessonsFailure, fetchLessonsStart } from '../actions/lessons';
import { LessonFetchState } from '../reducers/lessons.type';
import { lessonFetchStateSelector } from '../selectors/Lessons';

function* fetchLessonsIfNotExistsTransaction() {
  const fetchState = yield select(lessonFetchStateSelector);
  if (fetchState === LessonFetchState.INCOMPLETE)
    yield put(fetchLessonsStart());
}

function* fetchLatestLessonsTransaction() {
  try {
    const response = yield call(fetchAllLessons);
    yield put(fetchLessonsSuccess(response));
  } catch (err) {
    yield put(fetchLessonsFailure(err));
  }
}

function* watchFetchLessons() {
  yield takeLatest('FETCH_LESSONS_IF_NOT_EXIST', fetchLessonsIfNotExistsTransaction);
  yield takeLatest('FETCH_LESSONS_START', fetchLatestLessonsTransaction);
}

export default function* () {
  yield all([
    call(watchFetchLessons),
  ]);
}
