import Lessons, { LessonsState } from './lessons';
import { combineReducers } from 'redux';

export default combineReducers({
  Lessons
});

export type RootState = {
  Lessons: LessonsState;
};
