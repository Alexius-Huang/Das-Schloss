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

export enum CreateLessonSectionState {
  STATIC,
  PROCESSING,
  ERROR
}

export type Lesson = {
  id: number;
  type: LessonType;
  title: string;
  icon: AvailableIcons;
  content: string;
};

export type NewLesson = {
  type: LessonType;
  title: string;
  icon?: AvailableIcons;
  content?: string;
}

export type Section = {
  id: number;
  title: string;
  icon: AvailableIcons;
  lessons: Lesson[];
};

export type NewSection = {
  title: string;
  icon?: AvailableIcons;
}

export interface LessonsState {
  sections: Section[];
  fetchState: LessonFetchState;
  createLessonSection: {
    state: CreateLessonSectionState;
    createdInstance: null | Section;
    params: null | NewSection;
    error: null | string;
  };
  error: null | string;
}
