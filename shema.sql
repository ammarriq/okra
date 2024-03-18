-- DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  picture TEXT,
  email TEXT NOT NULL UNIQUE,
  provider TEXT,
  provider_id TEXT,
  updated_at INTEGER,
  created_at INTEGER NOT NULL
);

-- DROP TABLE IF EXISTS sessions;
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);