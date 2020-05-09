import { Noun, Verb } from "./Vocabulary.type";

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

export interface Vocabularies {
  nouns: Noun[];
  verbs: Verb[];
}

export interface NewLessonContent {
  content?: string;
}

export type UpdateLessonContent = { content: string };

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
