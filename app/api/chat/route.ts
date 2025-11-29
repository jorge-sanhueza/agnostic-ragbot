import { streamText, convertToModelMessages } from "ai";
import { ollama } from "ollama-ai-provider-v2";
import { searchDocuments } from "@/lib/search";

// Define the type for message parts
type MessagePart = {
  type: string;
  text?: string;
  // Add other possible properties if needed
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("Raw messages:", JSON.stringify(messages, null, 2));

    // Convert UI messages to model messages
    const modelMessages = convertToModelMessages(messages);

    // Get the latest user message safely
    const latestMessage = messages[messages.length - 1];
    let context = "";

    if (latestMessage && latestMessage.role === "user") {
      // Extract text from parts array with proper typing
      const userText = latestMessage.parts
        ?.map((part: MessagePart) =>
          part.type === "text" ? part.text || "" : ""
        )
        .join("")
        .trim();

      console.log("Extracted user text:", userText);

      if (userText) {
        console.log("Searching for context for query:", userText);
        const searchResults = await searchDocuments(userText, 3, 0.25);
        console.log("Raw search results:", searchResults);

        if (searchResults.length > 0) {
          context = searchResults.map((doc) => doc.content).join("\n\n");
          console.log(`Found ${searchResults.length} relevant documents`);
          console.log("Context being used:", context.substring(0, 200) + "...");
        } else {
          console.log("No relevant documents found");
        }
      } else {
        console.log("No text content found in user message parts");
      }
    } else {
      console.log("No valid user message found for context search");
    }

    const result = streamText({
      model: ollama("gemma3"),
      messages: modelMessages,
      system: `You are a helpful AI assistant with access to a knowledge base.

${
  context
    ? `Here is relevant context from the knowledge base:
${context}

PRIORITIZE this context when answering. If the context contains the answer, use it.`
    : "No specific context available from the knowledge base."
}

General Guidelines:
- For greetings and general questions, use your general knowledge
- For questions about specific topics that might be in the knowledge base, check if the context helps
- If the context doesn't contain the answer but you know it, provide your general knowledge
- Only say "I don't have that information" if it's specifically about the knowledge base content and you truly don't know

Be helpful and concise!`,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error processing chat request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
