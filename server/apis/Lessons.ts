import express from 'express';
import Knex from 'knex';
import LessonsModel from '../models/Lessons';
import * as T from '../models/Lessons.type';

export default function (app: express.Express, db: Knex) {
  const model = LessonsModel(db);

  app.get('/lessons', async (req, res) => {
    try {
      const lessons: T.LessonSection[] = await db.raw(`
        SELECT
          ls.id, ls.title, ls.icon, json_agg(lessons ORDER BY lessons.id ASC) AS lessons
        FROM lesson_sections ls
        INNER JOIN lessons ON lessons.lesson_section_id = ls.id
        GROUP BY ls.id
        ORDER BY ls.id ASC;
      `).then(res => res.rows);
  
      res.status(200).json(lessons);
    } catch {
      res.status(400).json('Fetch lessons error...');
    }
  });
  
  app.get('/lesson/content/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const lessonContents: T.LessonContent[] = await model.lessonContentFromLesson(id);
      const result: T.LessonContent = lessonContents[0];
      result.lesson = result.lesson[0];
      res.status(200).json(lessonContents[0]);
    } catch {
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
  
  app.put('/lesson/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const data: T.UpdateLesson & T.UpdateLessonContent = req.body;
      const { content, ...updateLessonData } = data;
      const updateLessonContentData = { content };
  
      const result: T.Lesson = await db.transaction(async trx => {
        const lessons: T.Lesson[] = await model.updateLesson(id, updateLessonData).transacting(trx);
        const lesson = lessons[0];
  
        await model.updateLessonContentFromLesson(id, updateLessonContentData).transacting(trx);
        return lesson;
      });
  
      res.status(200).json(result);
    } catch {
      res.status(400).json('Some error occurs on updating lesson...');
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
}
