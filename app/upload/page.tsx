"use client";

import { useState } from "react";
import { processPdfFile } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Upload } from "lucide-react";

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await processPdfFile(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "PDF processed successfully",
        });
        e.target.value = "";
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to process PDF",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        type: "error",
        text: "An error occurred while processing the PDF",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-700 mb-2">
            Suba sus Documentos PDF
          </h1>
          <p className="text-zinc-500 text-lg">
            Cargue aquí sus archivos PDF para integrarlos en la base de
            conocimientos de su asistente RAG.
          </p>
        </div>

        <Card className="border-zinc-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-[#D42B22] rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-700 mb-2">
                  Cargar Archivo PDF
                </h2>
                <p className="text-zinc-500 mb-6">
                  Seleccione un archivo PDF desde su dispositivo para comenzar.
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="pdf-upload"
                  className="text-zinc-700 font-medium"
                >
                  Escoja un archivo PDF:
                </Label>
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  className=" border-zinc-300 focus:border-[#D42B22] focus:ring-[#D42B22] text-zinc-700 
                    file:px-4 file:rounded-l-sm file:border-0 
                    file:text-sm file:font-semibold file:bg-[#D42B22] file:text-white 
                    hover:file:bg-[#b3241d] transition-colors file:cursor-pointer"
                />
                <p className="text-zinc-500 text-sm">
                  Formatos válidos: PDF (.pdf)
                </p>
              </div>

              {isLoading && (
                <div className="flex items-center justify-center gap-3 py-4 bg-zinc-50 rounded-lg border border-zinc-200">
                  <Loader2 className="h-5 w-5 animate-spin text-[#D42B22]" />
                  <span className="text-zinc-700 font-medium">
                    Procesando...
                  </span>
                </div>
              )}

              {message && (
                <Alert
                  variant={message.type === "error" ? "destructive" : "default"}
                  className={
                    message.type === "error"
                      ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-green-50 border-green-200 text-green-800"
                  }
                >
                  <AlertTitle
                    className={
                      message.type === "error"
                        ? "text-red-800"
                        : "text-green-800"
                    }
                  >
                    {message.type === "error" ? "Error" : "Success"}
                  </AlertTitle>
                  <AlertDescription
                    className={
                      message.type === "error"
                        ? "text-red-700"
                        : "text-green-700"
                    }
                  >
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm text-center">
            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-zinc-700 font-semibold text-sm">1</span>
            </div>
            <h3 className="font-semibold text-zinc-700 mb-2">Cargar</h3>
            <p className="text-zinc-500 text-sm">
              Seleccione y suba su archivo PDF
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm text-center">
            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-zinc-700 font-semibold text-sm">2</span>
            </div>
            <h3 className="font-semibold text-zinc-700 mb-2">Procesamiento</h3>
            <p className="text-zinc-500 text-sm">
              El asistente extrae y organiza la información
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm text-center">
            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-zinc-700 font-semibold text-sm">3</span>
            </div>
            <h3 className="font-semibold text-zinc-700 mb-2">Chat</h3>
            <p className="text-zinc-500 text-sm">
              Consulte su PDF a través del asistente RAG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
