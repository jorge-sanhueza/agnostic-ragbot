"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";

export default function RAGChatBot() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleUploadClick = () => {
    router.push("/upload");
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-100">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#D42B22] rounded-full animate-pulse" />
          <h1 className="text-lg font-semibold text-zinc-700">Asistente IA</h1>

          {/* Upload Button */}
          <button
            onClick={handleUploadClick}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#D42B22] hover:bg-[#b3241d] text-white rounded-lg transition-colors border border-transparent hover:border-[#D42B22] focus:outline-none focus:ring-2 focus:ring-[#D42B22] focus:ring-opacity-50 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Subir Documentos
          </button>

          <span className="text-sm text-zinc-500 ml-2">
            {status === "streaming" ? "Thinking..." : "Online"}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl h-full flex flex-col bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-zinc-700 mb-2">
                  Bienvenido al Asistente IA Dexpress
                </h3>
                <p className="text-zinc-500">
                  Preguntame cualquier cosa sobre los documentos subidos al
                  sistema.
                </p>
                <button
                  onClick={handleUploadClick}
                  className="mt-4 px-6 py-3 bg-[#D42B22] hover:bg-[#b3241d] text-white rounded-lg transition-colors border border-transparent hover:border-[#D42B22] focus:outline-none focus:ring-2 focus:ring-[#D42B22] focus:ring-opacity-50 shadow-sm"
                >
                  Cargar Documentos
                </button>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-[#D42B22] text-white shadow-sm"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-700 shadow-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {message.parts?.map((part) =>
                      part.type === "text" ? part.text : null
                    )}
                  </div>
                </div>
              </div>
            ))}

            {status === "streaming" && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-zinc-50 border border-zinc-200 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#D42B22] rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-[#D42B22] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-[#D42B22] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-zinc-200 bg-white p-6">
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                className="w-full min-h-[60px] max-h-[120px] px-4 py-3 pr-12 bg-white border border-zinc-300 text-zinc-700 rounded-lg resize-none focus:border-[#D42B22] focus:ring-1 focus:ring-[#D42B22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder-zinc-500 shadow-sm"
                disabled={status === "submitted"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />

              <button
                type="submit"
                disabled={!input.trim() || status === "submitted"}
                className="absolute right-2 bottom-2 p-2 text-zinc-400 hover:text-[#D42B22] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {status === "submitted" ? (
                  <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 px-1 text-sm text-zinc-500">
              <span>Presione Entrar para enviar</span>
              <span className="bg-zinc-100 px-2 py-1 rounded text-xs border border-zinc-200">
                {status === "streaming" ? "Processing..." : "Ready"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
