# RAG Chatbot

Fully-functional Retrieval-Augmented Generation chatbot that lets you upload PDFs and chat with your documents using AI. This project is based on: https://github.com/gopinav/Next.js-AI-SDK-RAG-Chatbot

## Features

- **PDF Upload** - Process and extract text from PDF documents
- **Semantic Search** - Vector-based document retrieval using embeddings
- **AI Chat** - Conversational interface powered by local LLMs (Gemma3)
- **Authentication** - Secure user management with Clerk
- **Vector Database** - PostgreSQL with pgvector for efficient similarity search
- **UI** - Modern, responsive design with Tailwind CSS

##  Differences from the base project

- **AI**: This project uses Ollama instead of openai's paid model
- **Configuration**: The threshold is preemmptively adjusted to 0.1 instead of the original 0.5 - consider rising it to 0.2 or .3 when live
- **Database**: The vector database schema is set to embedding dimension size of 768 instead of the 1536 from the openai's model
- **AI-models**: Ollama's Gemma3 (chatbot) + EmbeddingGemma (embeddings)
- **File Processing**: "pdf-parse-fixed" instead of "pdf-parse" npm packages
- 
## Credits
- **[Next.js AI SDK RAG Chatbot](https://github.com/gopinav/Next.js-AI-SDK-RAG-Chatbot)** by [gopinav](https://github.com/gopinav) - Original RAG implementation and architecture
