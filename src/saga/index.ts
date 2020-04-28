import { all, takeLatest, put, call } from 'redux-saga/effects';
import { fetchAllLessons } from '../api/lessons';
import { fetchLessonsSuccess, fetchLessonsFailure } from '../actions/lessons';

function* fetchLatestLessonsTransaction() {
  try {
    const response = yield call(fetchAllLessons);
    yield put(fetchLessonsSuccess(response));
  } catch (err) {
    yield put(fetchLessonsFailure(err));
  }
}

function* watchFetchLessons() {
  yield takeLatest('FETCH_LESSONS_START', fetchLatestLessonsTransaction);
}

export default function* () {
  yield all([
    call(watchFetchLessons),
  ]);
}
