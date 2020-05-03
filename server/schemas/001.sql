-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100),
--   email TEXT UNIQUE NOT NULL,
--   joined TIMESTAMP NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS accounts (
--   id SERIAL PRIMARY KEY,
--   hash VARCHAR(100) NOT NULL,
--   email TEXT UNIQUE NOT NULL,
--   isAdmin BOOLEAN DEFAULT FALSE
-- );

CREATE TYPE lesson_type AS ENUM ('conversation', 'vocabulary', 'grammer');

CREATE TABLE IF NOT EXISTS lesson_sections (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  icon VARCHAR(100) 'check'
);

CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  lesson_section_id INTEGER REFERENCES lesson_sections(id) ON DELETE CASCADE,
  type lesson_type NOT NULL,
  title VARCHAR(100) NOT NULL,
  icon VARCHAR(100) DEFAULT 'check',
  content TEXT DEFAULT ''
);
