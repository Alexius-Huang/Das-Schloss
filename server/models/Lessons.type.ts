export enum LessonType {
  Conversation = 'conversation',
  Vocabulary = 'vocabulary',
  Grammer = 'grammer',
}

export interface Lesson {
  id: number;
  type: LessonType;
  title: string;
  icon: string | null;
}

export interface NewLesson {
  type: LessonType;
  title: string;
  icon?: string;
}

export type UpdateLesson = Partial<NewLesson>;

export interface LessonContent {
  id: number;
  content: string;
  lesson: Lesson;
}

export interface NewLessonContent {
  content?: string;
}

export type UpdateLessonContent = Partial<NewLessonContent>;

export interface LessonSection {
  id: number;
  title: string;
  icon: string | null;
  lessons: Lesson[];
}

export interface NewLessonSection {
  title: string;
  icon?: string;
}

export type UpdateLessonSection = Partial<NewLessonSection>;
