import express from 'express';
import Knex from 'knex';
import LessonsModel from '../models/Lessons';
import * as T from '../models/Lessons.type';
import { Noun, Verb } from '../models/Vocabulary.type';

export default function (app: express.Express, db: Knex) {
  const model = LessonsModel(db);

  app.get('/lessons', async (req, res) => {
    try {
      const lessons: T.LessonSection[] = await model.lessons();
      res.status(200).json(lessons);
    } catch {
      res.status(400).json('Fetch lessons error...');
    }
  });
  
  app.get('/lesson/:id/content', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result: T.LessonContent = await db.transaction(async trx => {
        const [lessonContents, nouns, verbs]: [
          T.LessonContent[],
          Noun[],
          Verb[]
        ] = await Promise.all([
          model.lessonContent(id, { transacting: trx }),
          model.lessonVocabularyNouns(id, { transacting: trx }),
          model.lessonVocabularyVerbs(id, { transacting: trx })
        ]);

        const lessonContent: T.LessonContent & T.Vocabularies = {
          ...lessonContents[0],
          nouns,
          verbs,
        };

        lessonContent.lesson = lessonContent.lesson[0];
        return lessonContent;
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json('Fetch lesson content error...');
    }
  });
  
  app.post('/lesson-section', async (req, res) => {
    try {
      const result: T.LessonSection = await db.transaction(async trx => {
        const newSection: T.NewLessonSection = req.body;
        const result1: T.LessonSection[] = await model.createLessonSection(newSection).transacting(trx);
        const createdSection: T.LessonSection = { ...result1[0], lessons: [] };
  
        const newLesson: T.NewLesson = {
          title: `New lesson from ${createdSection.title}`,
          type: T.LessonType.Conversation,
        };
        const result2: T.Lesson[] = await model.createLesson(newLesson, createdSection).transacting(trx);
        const createdLesson: T.Lesson = { ...result2[0] };
        createdSection.lessons.push(createdLesson);
  
        const newLessonContent: T.NewLessonContent = {
          content: 'Setup content for new lesson...',
        };
        await model.createLessonContent(newLessonContent, createdLesson).transacting(trx);
  
        return createdSection;
      });
  
      res.status(200).json(result);
    } catch {
      res.status(400).json('Create new lesson-section error...');
    }
  });

  app.put('/lesson-section/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updateLessonSectionData: T.UpdateLessonSection = req.body;
      const result: T.LessonSection[] = await model.updateLessonSection(id, updateLessonSectionData);
      res.status(200).json(result[0]);
    } catch {
      res.status(400).json('Some error occurs on updating lesson...');
    }
  });

  app.put('/lesson/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const data: T.UpdateLesson = req.body;
      const lessons: T.Lesson[] = await model.updateLesson(id, data);
      const result: T.Lesson = lessons[0];
      res.status(200).json(result);
    } catch {
      res.status(400).json('Some error occurs on updating lesson...');
    }
  });

  app.put('/lesson/:id/content', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const data: T.UpdateLessonContent = req.body;
      const lessonContents: T.LessonContent[] = await model.updateLessonContent(id, data);
      const result: T.LessonContent = lessonContents[0];
      res.status(200).json(result);
    } catch {
      res.status(400).json('Some error occurs on updating lesson\'s content...');
    }
  });
}
