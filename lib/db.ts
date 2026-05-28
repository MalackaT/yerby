import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CSV_PATH = path.join(DATA_DIR, 'emails.csv');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, 'email,joined_at\n', 'utf8');
  }
}

function emailExists(email: string): boolean {
  if (!fs.existsSync(CSV_PATH)) return false;
  const lines = fs.readFileSync(CSV_PATH, 'utf8').split('\n').slice(1);
  return lines.some((line) => line.split(',')[0]?.toLowerCase() === email);
}

export type SubscribeResult =
  | { success: true; alreadyExists: false }
  | { success: true; alreadyExists: true }
  | { success: false; error: string };

export function addSubscriber(email: string): SubscribeResult {
  ensureFile();

  if (emailExists(email)) {
    return { success: true, alreadyExists: true };
  }

  fs.appendFileSync(CSV_PATH, `${email},${new Date().toISOString()}\n`, 'utf8');
  return { success: true, alreadyExists: false };
}
