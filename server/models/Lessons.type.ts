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
  content: string;
}

export interface NewLesson {
  type: LessonType;
  title: string;
  icon?: string;
  content?: string;
}

export type UpdateLesson = Partial<NewLesson>;

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
