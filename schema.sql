DROP TABLE IF EXISTS users;
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

DROP TABLE IF EXISTS sessions;
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS folders;
CREATE TABLE IF NOT EXISTS folders (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  icon TEXT,
  created_by TEXT NOT NULL,
  updated_at INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS folder_users;
CREATE TABLE IF NOT EXISTS folder_users (
  id TEXT NOT NULL PRIMARY KEY,
  folder_id TEXT,
  user_id TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (folder_id) REFERENCES folders (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS invites;
CREATE TABLE IF NOT EXISTS invites (
  id TEXT NOT NULL PRIMARY KEY,
  folder_id TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (folder_id) REFERENCES folders (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS sections;
CREATE TABLE IF NOT EXISTS sections (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  rank TEXT NOT NULL,
  folder_id TEXT NOT NULL, 
  created_by TEXT NOT NULL,
  updated_at INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (folder_id) REFERENCES folders (id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tasks;
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  description TEXT,
  rank TEXT NOT NULL,
  section_id TEXT NOT NULL,
  due_date INTEGER,
  created_by TEXT NOT NULL,
  updated_at INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (section_id) REFERENCES sections (id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
);