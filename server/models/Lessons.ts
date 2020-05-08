import Knex from "knex";
import * as T from './Lessons.type';

export default function (db: Knex) {
  return {
    db,
    createLessonSection(params: T.NewLessonSection) {
      return this.db.insert({ ...params }).into('lesson_sections').returning('*');
    },
    createLesson(params: T.NewLesson, section: T.LessonSection) {
      return this.db.insert({ ...params, lesson_section_id: section.id }).into('lessons').returning('*');
    },
    createLessonContent(params: T.NewLessonContent, lesson: T.Lesson) {
      return this.db.insert({ ...params, lesson_id: lesson.id }).into('lesson_contents').returning('*');
    },
    updateLessonSection(id: number, params: T.UpdateLessonSection) {
      return this.db.from('lesson_sections').where({ id }).update(params).returning('*');
    },
    updateLesson(id: number, params: T.UpdateLesson) {
      return this.db.from('lessons').where({ id }).update(params).returning('*');
    },
    // updateLessonContent(id: number, params: T.UpdateLessonContent) {
    //   return this.db.from('lesson_contents').where({ id }).update(params).returning('*');
    // },
    updateLessonContentFromLesson(id: number, params: T.UpdateLessonContent) {
      return this.db.from('lesson_contents').where({ lesson_id: id }).update(params).returning('*');
    },
    allLessonSections() {
      return this.db.select('*').from('lesson_sections');
    },
    lessonContentFromLesson(id: number) {
      return this.db.raw(`
        SELECT
          lc.id, lc.content, json_agg(lessons) AS lesson
        FROM lesson_contents lc
        INNER JOIN lessons ON lessons.id = lc.lesson_id
        WHERE lc.lesson_id = ${id}
        GROUP BY lc.id;
      `).then(res => res.rows);
    }
  };
};