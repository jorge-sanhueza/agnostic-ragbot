import {
  pgTable,
  serial,
  text,
  vector,
  index,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createHash } from "crypto";

export const documents = pgTable(
  "documents",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    contentHash: varchar("content_hash", { length: 64 }).notNull(),
    embedding: vector("embedding", { dimensions: 768 }),
  },
  (table) => [
    index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
    uniqueIndex("content_hash_idx").on(table.contentHash),
  ]
);

export function generateContentHash(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

export type InsertDocument = typeof documents.$inferInsert;
export type SelectDocument = typeof documents.$inferSelect;
