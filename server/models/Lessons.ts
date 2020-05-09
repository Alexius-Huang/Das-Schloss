import Knex from "knex";
import * as T from './Lessons.type';

type Options = {
  transacting?: Knex.Transaction;
};

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
    lessons(options?: Options) {
      return (options?.transacting ?? this.db).raw(`
        SELECT
          ls.id, ls.title, ls.icon, json_agg(lessons ORDER BY lessons.id ASC) AS lessons
        FROM lesson_sections ls
        INNER JOIN lessons ON lessons.lesson_section_id = ls.id
        GROUP BY ls.id
        ORDER BY ls.id ASC;
      `).then(res => res.rows);
    },
    lessonContent(lessonId: number, options?: Options) {
      return (options?.transacting ?? this.db).raw(`
        SELECT
          lc.*,
          json_agg(l) AS lesson
        FROM lessons l
        INNER JOIN lesson_contents lc ON l.id = lc.lesson_id
        WHERE l.id = ${lessonId}
        GROUP BY lc.id;
      `).then(res => res.rows);
    },
    lessonVocabularyNouns(lessonId: number, options?: Options) {
      return (options?.transacting ?? this.db).raw(`
        SELECT vn.* FROM lessons l
        INNER JOIN lesson_vocabulary_nouns lvn ON l.id = lvn.lesson_id
        INNER JOIN vocabulary_nouns        vn  ON lvn.noun_id = vn.id
        WHERE l.id = ${lessonId}
        GROUP BY vn.id;
      `).then(res => res.rows);
    },
    lessonVocabularyVerbs(lessonId: number, options?: Options) {
      return (options?.transacting ?? this.db).raw(`
        SELECT
          vv.*,
          json_agg(json_build_object(
            'id', ipc.id,
            'firstPerson', ipc.first_person,
            'secondPerson', ipc.second_person,
            'thirdPerson', ipc.third_person,
            'firstPersonPlural', ipc.first_person_plural,
            'secondPersonPlural', ipc.second_person_plural,
            'thirdPersonPlural', ipc.third_person_plural
          )) AS ipc
        FROM lessons l
          INNER JOIN lesson_vocabulary_verbs         lvv ON l.id = lvv.lesson_id
          INNER JOIN vocabulary_verbs                vv  ON vv.id = lvv.verb_id
          INNER JOIN indicative_present_conjugations ipc ON ipc.id = vv.id
        WHERE l.id = ${lessonId}
        GROUP BY vv.id;      
      `).then(res => res.rows);
    }
  };
};