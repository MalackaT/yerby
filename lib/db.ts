import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  _db = new Database(path.join(dataDir, 'emails.db'));

  _db.pragma('journal_mode = WAL');

  _db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      email      TEXT    UNIQUE NOT NULL COLLATE NOCASE,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);

  return _db;
}

export type SubscribeResult =
  | { success: true; alreadyExists: false }
  | { success: true; alreadyExists: true }
  | { success: false; error: string };

export function addSubscriber(email: string): SubscribeResult {
  try {
    getDb().prepare('INSERT INTO subscribers (email) VALUES (?)').run(email);
    return { success: true, alreadyExists: false };
  } catch (err: unknown) {
    const sqliteErr = err as { code?: string };
    if (sqliteErr.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: true, alreadyExists: true };
    }
    throw err;
  }
}
