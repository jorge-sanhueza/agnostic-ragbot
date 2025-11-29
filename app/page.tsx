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
    <div className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-zinc-200 shadow-sm mb-8">
            <div className="w-2 h-2 bg-[#D42B22] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-zinc-600">
              Asistente IA para documentación
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Consulte por{" "}
            <span className="bg-linear-to-r from-[#D42B22] to-[#b3241d] bg-clip-text text-transparent">
              documentos
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Este asistente permite cargar documentos en formato PDF y responde
            consultas relacionadas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <SignUpButton>
              <Button
                size="lg"
                className="px-8 text-base h-12 bg-[#D42B22] hover:bg-[#b3241d] text-white border border-transparent hover:border-[#D42B22] focus:ring-2 focus:ring-[#D42B22] focus:ring-opacity-50 shadow-sm"
              >
                Comience aquí
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
                className="px-8 text-base h-12 border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 shadow-sm"
              >
                Ver Demo
              </Button>
            </Link>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-white border border-zinc-200 shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold text-zinc-700 mb-2">
                Chat IA Avanzado
              </h3>
              <p className="text-zinc-600 text-sm">
                Basado en modelos avanzados de lenguaje para respuestas precisas
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white border border-zinc-200 shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-zinc-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-zinc-700 mb-2">
                Procesa Documentos
              </h3>
              <p className="text-zinc-600 text-sm">
                Permite cargar y consultar múltiples archivos PDF fácilmente
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white border border-zinc-200 shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-zinc-700 mb-2">
                Respuestas Rápidas
              </h3>
              <p className="text-zinc-600 text-sm">
                Obtén respuestas en segundos
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
