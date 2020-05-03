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

export enum APIState {
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

export type UpdateLesson = { id: number; params: Partial<NewLesson> };

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

export type UpdateSection = { id: number; params: Partial<NewSection> };

interface APITransaction<Tinstance, Tparams, Terror = string> {
  state: APIState;
  instance: null | Tinstance;
  params: null | Tparams;
  error: null | Terror;
}

export type CreateLessonSectionTransaction = APITransaction<Section, NewSection>;
export type UpdateLessonTransaction = APITransaction<Lesson, UpdateLesson>;
export type LessonTransactions =
  CreateLessonSectionTransaction |
  UpdateLessonTransaction
;

export interface LessonsState {
  sections: Section[];
  fetchState: LessonFetchState;
  createLessonSection: CreateLessonSectionTransaction;
  updateLessonSection: UpdateLessonTransaction;
  error: null | string;
}
