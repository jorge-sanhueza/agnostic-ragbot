import { embed, embedMany } from "ai";
import { ollama } from "ollama-ai-provider-v2";

export async function generateEmbedding(text: string) {
  const input = text.replace(/\n/g, " ").trim();

  if (!input || input.length === 0) {
    console.error("Empty text after processing:", text);
    return [];
  }

  const { embedding } = await embed({
    model: ollama.embedding("embeddinggemma"),
    value: input,
  });

  console.log(`Generated embedding with ${embedding?.length || 0} dimensions`);
  return embedding || [];
}

export async function generateEmbeddings(texts: string[]) {
  const inputs = texts.map((text) => text.replace("\n", " "));

  const { embeddings } = await embedMany({
    model: ollama.embedding("embeddinggemma"),
    values: inputs,
  });
  return embeddings;
}
