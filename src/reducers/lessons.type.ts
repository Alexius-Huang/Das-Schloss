import { AvailableIcons } from "../helpers/icons";

export enum LessonType {
  Conversation = 'conversation',
  Vocabulary = 'vocabulary',
  Grammer = 'grammer',
}

export enum LessonFetchState {
  INCOMPLETE,
  PROCESSING,
  COMPLETED,
  ERROR
};

export type Lesson = {
  id: number;
  type: LessonType;
  title: string;
  icon: AvailableIcons;
};

export type Section = {
  id: number;
  title: string;
  icon: AvailableIcons;
  lessons: Lesson[];
};

export interface LessonsState {
  sections: Section[];
  fetchState: LessonFetchState;
  error: null | string;
}
