import { LessonsAction } from '../actions/lessons.type';

export enum LessonType {
  Conversation = 1,
  Vocabulary = 2,
  Grammer = 3,
}

export type Lesson = {
  id: number;
  sectionId: number;
  type: LessonType;
  title: string;
  icon: string;
};

export type Section = {
  id: number;
  title: string;
  icon: string;
  lessons: Lesson[];
};

export interface LessonsState {
  sections: Section[];
}

const defaultState: LessonsState = {
  sections: []
};

export default function (state = defaultState, action: LessonsAction) {
  switch (action.type) {
    case 'SET_SECTIONS':
      return { ...state, sections: action.payload };
    default:
      return state;
  }
}
