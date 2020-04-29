import Lessons from './lessons';
import UI from './ui';
import { LessonsState } from './lessons.type';
import { UIState } from './ui.type';
import { combineReducers } from 'redux';

export default combineReducers({
  Lessons,
  UI,
});

export type RootState = {
  Lessons: LessonsState;
  UI: UIState;
};
