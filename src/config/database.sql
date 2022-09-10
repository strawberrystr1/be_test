DROP TABLE IF EXISTS meetups;

CREATE TABLE meetups (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  theme TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP with time zone NOT NULL,
  place TEXT NOT NULL,
  tags TEXT[],
  participants INTEGER[] DEFAULT ARRAY[]::integer[],
  createdBy INTEGER REFERENCES user_data (id)
)

CREATE TABLE user_data (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  meets INTEGER[] DEFAULT ARRAY[]::integer[],
  role TEXT NOT NULL DEFAULT 'user'::text
)

