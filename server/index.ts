import express from 'express';
import knex from 'knex';
// import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import * as T from './models/Lessons.type';

dotenv.config();

const app = express();
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE
  }
});

app.use(cors());

// Replace code for body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  const { method, url } = req;
  console.log(`${method} :: ${url}`);
  next();
});

const LessonModel = {
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
    const lessonContents: T.LessonContent[] = await LessonModel.lessonContentFromLesson(id);
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
      const result1: T.LessonSection[] = await LessonModel.createLessonSection(newSection).transacting(trx);
      const createdSection: T.LessonSection = { ...result1[0], lessons: [] };

      const newLesson: T.NewLesson = {
        title: `New lesson from ${createdSection.title}`,
        type: T.LessonType.Conversation,
      };
      const result2: T.Lesson[] = await LessonModel.createLesson(newLesson, createdSection).transacting(trx);
      const createdLesson: T.Lesson = { ...result2[0] };
      createdSection.lessons.push(createdLesson);

      const newLessonContent: T.NewLessonContent = {
        content: 'Setup content for new lesson...',
      };
      await LessonModel.createLessonContent(newLessonContent, createdLesson).transacting(trx);

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
      const lessons: T.Lesson[] = await LessonModel.updateLesson(id, updateLessonData).transacting(trx);
      const lesson = lessons[0];

      await LessonModel.updateLessonContentFromLesson(id, updateLessonContentData).transacting(trx);
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
    const result: T.LessonSection[] = await LessonModel.updateLessonSection(id, updateLessonSectionData);
    res.status(200).json(result[0]);
  } catch {
    res.status(400).json('Some error occurs on updating lesson...');
  }
});

// Serve static files
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   joined: Date;
// }

// app.get('/user/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const users: User[] = await db.select('*').from('users').where({ id });
//     if (!users[0]) res.status(400).json('No user found...');
//     res.json(users[0]);
//   } catch(err) {
//      res.status(400).json('Encountered error...');
//   }
// });

// app.post('/sign-up', (req, res) => {
//   const { name, email, password } = req.body;
//   const hash = bcrypt.hashSync(password, 10);

//   db.transaction(trx => {
//     trx.insert({ email, hash })
//       .into('accounts')
//       .returning('email')
//       .then(email => db('users')
//         .returning('*')
//         .insert({ name, email: email[0], joined: new Date() })
//         .then(user => res.json(user))
//         .catch(_ => res.status(400).json('Encountered registration problem...'))
//       )
//       .then(trx.commit)
//       .catch(trx.rollback);
//   });
// });

// app.post('/sign-in', (req, res) => {
//   const { email, password } = req.body;
//   db.select('hash').from('accounts').where({ email })
//     .then(data => {
//       const { hash } = data[0];
//       if (bcrypt.compareSync(password, hash)) {
//         db.select('*').from('users').where({ email })
//           .then(data => {
//             res.json(data[0]);
//           })
//           .catch(_ => res.status(400).json('Encounter sign in error...'));
//       } else {
//         res.status(400).json('Invalid password');
//       }
//     })
//     .catch(_ => res.status(400).json('Wrong credential...'));
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listen on port: ${port} ...`);
});
