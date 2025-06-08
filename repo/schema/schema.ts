import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todo", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
});
