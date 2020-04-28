import { LessonsState } from './lessons.type';
import Lessons from './lessons';
import { combineReducers } from 'redux';

export default combineReducers({
  Lessons
});

export type RootState = {
  Lessons: LessonsState;
};
