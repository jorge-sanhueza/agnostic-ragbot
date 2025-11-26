import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from "./db-config";
import { documents } from "./db-schema";
import { generateEmbedding } from "./embeddings";

/**
 * Search for similar documents using Drizzle ORM with cosineDistance
 */
export async function searchDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.1
) {
  console.log("Search query:", query);
  // Validate the query
  if (!query || typeof query !== "string" || query.trim().length === 0) {
    console.error("Invalid query:", query);
    return [];
  }
  // Generate embedding for the search query
  const embedding = await generateEmbedding(query);
  console.log("Query embedding length:", embedding.length);
  console.log("First 5 values:", embedding.slice(0, 5));

  // Check if embedding is valid
  if (!embedding || embedding.length === 0) {
    console.error("Failed to generate embedding for query:", query);
    return [];
  }

  // Calculate similarity using Drizzle's cosineDistance function
  // This creates a SQL expression for similarity calculation
  const similarity = sql<number>`1 - (${cosineDistance(
    documents.embedding,
    embedding
  )})`;

  // Use Drizzle's query builder for the search
  const similarDocuments = await db
    .select({
      id: documents.id,
      content: documents.content,
      similarity,
    })
    .from(documents)
    .where(gt(similarity, threshold))
    .orderBy(desc(similarity))
    .limit(limit);

  console.log(`Found ${similarDocuments.length} similar documents`);
  return similarDocuments;
}
