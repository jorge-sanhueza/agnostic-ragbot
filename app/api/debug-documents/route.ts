// app/api/debug-documents/route.ts
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const allDocs = await db.select().from(documents).limit(10);
    
    // Also check if we can find TMSDexpress with simple SQL search
    const matchingDocs = await db
      .select()
      .from(documents)
      .where(sql`${documents.content} ILIKE '%TMSDexpress%'`)
      .limit(5);

    return Response.json({ 
      totalCount: allDocs.length, 
      sampleDocuments: allDocs,
      tmsdMatches: matchingDocs,
      tmsdMatchCount: matchingDocs.length
    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}