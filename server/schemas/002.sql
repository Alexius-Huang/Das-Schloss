CREATE TYPE gender_type AS ENUM ('m', 'f', 'n');

CREATE TABLE IF NOT EXISTS vocabulary_nouns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  translation VARCHAR(100) NOT NULL,
  gender gender_type NOT NULL,
  plural VARCHAR(100) DEFAULT NULL,
  info TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS vocabulary_verbs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  translation VARCHAR(100) NOT NULL,
  info TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS indicative_present_conjugations (
  id SERIAL PRIMARY KEY,
  verb_id INTEGER REFERENCES vocabulary_verbs,
  first_person VARCHAR(100) NOT NULL,
  second_person VARCHAR(100) NOT NULL,
  third_person VARCHAR(100) NOT NULL,
  first_person_plural VARCHAR(100) NOT NULL,
  second_person_plural VARCHAR(100) NOT NULL,
  third_person_plural VARCHAR(100) NOT NULL  
);
