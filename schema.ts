import { pgTable, serial, text, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";

export const subjects = pgTable("subjects", {
  id: varchar("id", { length: 10 }).primaryKey(),
  code: varchar("code", { length: 20 }).notNull(),
  name: text("name").notNull(),
  bn: text("bn").notNull(),
  emoji: text("emoji").notNull(),
  grad: text("grad").notNull(),
  accent: text("accent").notNull(),
  mid: text("mid").notNull(),
  bg: text("bg").notNull(),
  orderIndex: integer("order_index").default(0),
});

export const chapters = pgTable("chapters", {
  id: varchar("id", { length: 50 }).primaryKey(),
  subjectId: varchar("subject_id", { length: 10 }).notNull().references(() => subjects.id, { onDelete: "cascade" }),
  chapterNo: integer("chapter_no").notNull(),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  emoji: text("emoji").default("📖"),
  orderIndex: integer("order_index").default(0),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  subjectId: varchar("subject_id", { length: 10 }).notNull().references(() => subjects.id, { onDelete: "cascade" }),
  chapterId: varchar("chapter_id", { length: 50 }).notNull().references(() => chapters.id, { onDelete: "cascade" }),
  division: varchar("division", { length: 10 }).notNull(), // 'ka', 'kha', 'ga'
  q: text("q").notNull(),
  answer: text("answer"),
  hot: boolean("hot").default(false),
  years: text("years"), // e.g. "NU '21, '19, '17"
  marks: integer("marks").default(1),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
  clientKey: text("client_key").default("guest"),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const studyNotes = pgTable("study_notes", {
  id: serial("id").primaryKey(),
  subjectId: varchar("subject_id", { length: 10 }).notNull().references(() => subjects.id, { onDelete: "cascade" }),
  chapterId: varchar("chapter_id", { length: 50 }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").default("নোয়াখালী সরকারি কলেজ"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Subject = typeof subjects.$inferSelect;
export type Chapter = typeof chapters.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type Bookmark = typeof bookmarks.$inferSelect;
export type StudyNote = typeof studyNotes.$inferSelect;
