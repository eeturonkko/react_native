import * as SQLite from "expo-sqlite";

export type Boot = { id: number; type: string; size: string };

const db = SQLite.openDatabaseSync("boots.db");

export async function initDb(): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS boots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      size TEXT NOT NULL
    );
  `);
}

export async function fetchBoots(): Promise<Boot[]> {
  const result = await db.getAllAsync<Boot>(
    "SELECT id, type, size FROM boots ORDER BY id ASC;"
  );
  return result;
}

export async function insertBoot(type: string, size: string): Promise<void> {
  await db.runAsync("INSERT INTO boots (type, size) VALUES (?, ?);", [
    type,
    size,
  ]);
}

export async function updateBootRow(
  id: number,
  type: string,
  size: string
): Promise<void> {
  await db.runAsync("UPDATE boots SET type = ?, size = ? WHERE id = ?;", [
    type,
    size,
    id,
  ]);
}

export async function deleteBootRow(id: number): Promise<void> {
  await db.runAsync("DELETE FROM boots WHERE id = ?;", [id]);
}

export default {};
