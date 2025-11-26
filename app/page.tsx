import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function HomePage() {
  const user = await currentUser();

  // If user is logged in, redirect to chat
  if (user) {
    redirect("/chat");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated linear badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">
              AI-Powered Document Chat
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Chat with your{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              documents
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Upload your documents and ask questions in natural language. Our AI
            understands your content and provides instant answers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <SignUpButton>
              <Button size="lg" className="px-8 text-base h-12">
                Start Chatting Free
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </SignUpButton>

            <Link href="/chat">
              <Button
                variant="outline"
                size="lg"
                className="px-8 text-base h-12"
              >
                See Demo
              </Button>
            </Link>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart AI</h3>
              <p className="text-gray-600 text-sm">
                Powered by advanced language models for accurate answers
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Any Documents
              </h3>
              <p className="text-gray-600 text-sm">
                PDFs, text files, and more - we handle various formats
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Instant Answers
              </h3>
              <p className="text-gray-600 text-sm">
                Get responses in seconds, not hours of manual searching
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
