import express from 'express';
import knex from 'knex';
import cors from 'cors';
import dotenv from 'dotenv';
import * as APIs from './apis';
// import bcrypt from 'bcrypt';

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

APIs.Lessons(app, db);

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
