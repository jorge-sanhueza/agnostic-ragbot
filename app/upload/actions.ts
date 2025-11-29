"use server";

// @ts-expect-error pdf-parse-fixed has no types
import pdf from "pdf-parse-fixed";
import { db } from "@/lib/db-config";
import { documents, generateContentHash } from "@/lib/db-schema"; // Import from schema
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";
import { eq } from "drizzle-orm";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return { success: false, error: "No text found in PDF" };
    }

    // Rest of your processing...
    const chunks = await chunkContent(data.text);

    // Check for duplicates and filter them out
    const uniqueChunks: string[] = [];
    const chunkHashes: string[] = [];

    for (const chunk of chunks) {
      const chunkHash = generateContentHash(chunk); // Use imported function

      // Check if this chunk already exists in database
      const existingDoc = await db
        .select()
        .from(documents)
        .where(eq(documents.contentHash, chunkHash))
        .limit(1);

      // Only process if it doesn't exist
      if (existingDoc.length === 0) {
        uniqueChunks.push(chunk);
        chunkHashes.push(chunkHash);
      }
    }

    // If all chunks are duplicates, return early
    if (uniqueChunks.length === 0) {
      return {
        success: false,
        error: "All content from this PDF already exists in the database",
        duplicate: true,
      };
    }

    // Generate embeddings only for unique chunks
    const embeddings = await generateEmbeddings(uniqueChunks);

    const records = uniqueChunks.map((chunk, index) => ({
      content: chunk,
      contentHash: chunkHashes[index],
      embedding: embeddings[index],
    }));

    await db.insert(documents).values(records);

    const duplicateCount = chunks.length - uniqueChunks.length;
    let message = `Created ${records.length} searchable chunks`;

    if (duplicateCount > 0) {
      message += ` (${duplicateCount} duplicate chunks skipped)`;
    }

    return {
      success: true,
      message: message,
      chunksCreated: records.length,
      duplicatesSkipped: duplicateCount,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      error: "Failed to process PDF",
    };
  }
}
