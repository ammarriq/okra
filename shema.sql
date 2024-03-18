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

-- DROP TABLE IF EXISTS boards;
CREATE TABLE IF NOT EXISTS boards (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  created_by TEXT NOT NULL,
  updated_at INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS board_users;
CREATE TABLE IF NOT EXISTS board_users (
  id TEXT NOT NULL PRIMARY KEY,
  board_id TEXT,
  user_id TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS invitations;
CREATE TABLE IF NOT EXISTS invitations (
  id TEXT NOT NULL PRIMARY KEY,
  board_id TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS columns;
CREATE TABLE IF NOT EXISTS columns (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  rank INTEGER NOT NULL,
  board_id TEXT NOT NULL, 
  created_by TEXT NOT NULL,
  updated_at INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS tasks;
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  description TEXT,
  rank INTEGER NOT NULL,
  column_id TEXT NOT NULL,
  due_date INTEGER,
  created_by TEXT NOT NULL,
  updated_at INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (column_id) REFERENCES columns (id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);