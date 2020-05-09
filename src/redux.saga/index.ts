import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import * as LessonAPI from '../api/lessons';
import * as LessonActions from '../redux.actions/lessons';
import * as UIActions from '../redux.actions/ui';
import { LessonFetchState, NewSection, UpdateLesson, Lesson, LessonContent } from '../redux.reducers/lessons.type';
import { selectLessonFetchState } from '../redux.selectors/Lessons';
import { RootState } from '../redux.reducers';
import { Modals } from '../redux.reducers/ui.type';

function* fetchLessonsIfNotExistsTransaction() {
  const fetchState = yield select(selectLessonFetchState);
  if (fetchState === LessonFetchState.INCOMPLETE)
    yield put(LessonActions.fetchLessonsStart());
}

function* fetchLatestLessonsTransaction() {
  try {
    const response = yield call(LessonAPI.fetchAllLessons);
    yield put(LessonActions.fetchLessonsSuccess(response));
  } catch (err) {
    yield put(LessonActions.fetchLessonsError(err));
  }
}

function* fetchLessonContentTransaction() {
  try {
    const params = yield select(
      (state: RootState) => state.Lessons.fetchLessonContent.params
    );
    const response = yield call(LessonAPI.fetchLessonContent, params.lessonId);
    yield put(LessonActions.fetchLessonContentSuccess(response));
  } catch (err) {
    yield put(LessonActions.fetchLessonContentError(err));
  }
}

function* createLessonSectionTransaction() {
  try {
    const newSection: NewSection = yield select(
      (state: RootState) => state.Lessons.createLessonSection.params
    );
    const response = yield call(LessonAPI.createLessonSection, newSection);
    yield put(LessonActions.createLessonSectionSuccess(response));
  } catch (err) {
    yield put(LessonActions.createLessonSectionError(err));
  }
}

function* updateLessonTransaction() {
  try {
    const params: UpdateLesson = yield select(
      (state: RootState) => state.Lessons.updateLesson.params
    );
    const response = yield call(LessonAPI.updateLesson, params);
    yield put(LessonActions.updateLessonSuccess(response));

    const updatedLesson: Lesson = yield select(
      (state: RootState) => state.Lessons.updateLesson.instance
    );
    yield put(UIActions.openModal({ type: Modals.APISuccess, action: 'Update', name: updatedLesson.title }));
  } catch (err) {
    yield put(LessonActions.updateLessonError(err));
  }
}

function* updateLessonContentTransaction() {
  try {
    const { params, lessonId } = yield select(
      (state: RootState) => state.Lessons.updateLessonContent.params
    );
    const response = yield call(LessonAPI.updateLessonContent, lessonId, params);
    yield put(LessonActions.updateLessonContentSuccess(response));
    yield put(UIActions.openModal({ type: Modals.APISuccess, action: 'Update', name: 'Content' }));
  } catch (err) {
    yield put(LessonActions.updateLessonError(err));
  }
}

function* watchLessons() {
  yield takeLatest('FETCH_LESSONS_IF_NOT_EXIST', fetchLessonsIfNotExistsTransaction);
  yield takeLatest('FETCH_LESSONS_START', fetchLatestLessonsTransaction);
  yield takeLatest('FETCH_LESSON_CONTENT_START', fetchLessonContentTransaction);
  yield takeLatest('CREATE_LESSON_SECTION_START', createLessonSectionTransaction);
  yield takeLatest('UPDATE_LESSON_START', updateLessonTransaction);
  yield takeLatest('UPDATE_LESSON_CONTENT_START', updateLessonContentTransaction);
}

export default function* () {
  yield all([
    call(watchLessons),
  ]);
}
