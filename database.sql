DROP TABLE IF EXISTS meetups;

CREATE TABLE meetups (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  theme TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP with time zone NOT NULL,
  place TEXT NOT NULL,
  tags TEXT[]
)