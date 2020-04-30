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

export interface LessonSection {
  id: number;
  title: string;
  icon: string | null;
  lessons: Lesson[];
}

export interface LessonContent {
  id: number;
  content: string;
}