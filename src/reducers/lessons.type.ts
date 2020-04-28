import { AvailableIcons } from "../helpers/icons";

export enum LessonType {
  Conversation = 1,
  Vocabulary = 2,
  Grammer = 3,
}

export enum LessonFetchState {
  INCOMPLETE,
  PROCESSING,
  COMPLETED,
  ERROR
};

export type Lesson = {
  id: number;
  sectionId: number;
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
